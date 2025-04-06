// src/app/api/ai-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { selectPrompt } from '@/lib/ai-prompts';
import { extractSources } from '@/lib/sources-extractor';

// יצירת קליינט Hugging Face עם מפתח API
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

// רשימת מודלים מומלצים לשימוש בעברית
const MODELS = {
  default: 'mistralai/Mistral-7B-Instruct-v0.2', // מודל ברירת מחדל טוב
  // מודלים טובים נוספים לעברית:
  hebrew: 'microsoft/phi-2',        // תומך בעברית ומצוין לשאלות-תשובות
  academic: 'meta-llama/Llama-2-13b-chat-hf', // טוב למחקר ותוכן אקדמי
  fast: 'google/gemma-7b-it'        // מודל מהיר יותר
};

export async function POST(req: NextRequest) {
  try {
    // קבלת הנתונים מהבקשה
    const formData = await req.formData();
    const query = formData.get('query') as string;
    const customPromptJson = formData.get('customPrompt') as string;
    const customPrompt = customPromptJson ? JSON.parse(customPromptJson) : null;
    
    // אם חסר מידע חיוני
    if (!query) {
      return NextResponse.json(
        { error: 'לא סופקה שאילתה' },
        { status: 400 }
      );
    }
    
    // מיצוי קבצים מה-FormData אם יש
    const documents: { filename: string; content: string }[] = [];
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('document_') && value instanceof File) {
        const file = value as File;
        // קריאת תוכן הקובץ (במקרה שהוא טקסטואלי)
        const content = await file.text();
        documents.push({
          filename: file.name,
          content: content
        });
      }
    }
    
    // יצירת פרומפט
    // בחירת פרומפט מותאם לסוג השאלה
    let systemPrompt = customPrompt?.systemPrompt || selectPrompt(query);
    
    // הוספת מידע על הקבצים אם יש
    if (documents.length > 0) {
      systemPrompt += `\n\nהמשתמש העלה את הקבצים הבאים שעליך להתייחס אליהם בתשובתך:
      ${documents.map(doc => `- ${doc.filename}`).join('\n')}`;
    }
    
    // בניית הפרומפט לפי הפורמט שמודלים של Hugging Face מצפים לו
    let fullPrompt = `<s>[INST] ${systemPrompt}\n\nשאלה: ${query}\n\n`;
    
    if (documents.length > 0) {
      fullPrompt += `תוכן הקבצים שהועלו:\n\n`;
      documents.forEach(doc => {
        // הגבלת אורך תוכן הקובץ כדי למנוע חריגה ממגבלות המודל
        const maxContentLength = 1500; // הגבלה קטנה יותר מאשר עם Claude
        fullPrompt += `===== תחילת קובץ: ${doc.filename} =====\n`;
        fullPrompt += doc.content.substring(0, maxContentLength);
        if (doc.content.length > maxContentLength) fullPrompt += '... (המשך הקובץ הושמט)';
        fullPrompt += `\n===== סוף קובץ: ${doc.filename} =====\n\n`;
      });
    }
    
    fullPrompt += `עבור שאלה זו, אנא ספק תשובה מקיפה ומבוססת מחקר. 
    כלול מקורות רלוונטיים ומידע מהימן. 
    אם אתה מזכיר מאמרים או מקורות אקדמיים, אנא כלול את פרטי המקור בפורמט הבא:
    
    SOURCE: [שם המקור]
    AUTHORS: [שמות המחברים]
    YEAR: [שנת פרסום]
    RELEVANCE: [אחוז רלוונטיות]
    URL: [קישור למקור אם זמין]
    SUMMARY: [תקציר קצר של המקור]
    [/INST]`;
    
    // הגדרת המודל לפי הגדרות הסביבה או ברירת מחדל
    const model = process.env.HF_MODEL || MODELS.default;
    const maxTokens = parseInt(process.env.MAX_TOKENS || '1024');
    const temperature = parseFloat(process.env.TEMPERATURE || '0.7');
    
    console.log(`שולח בקשה למודל ${model}...`);
    
    // קריאה ל-Hugging Face API
    const response = await hf.textGeneration({
      model: model,
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: maxTokens,
        temperature: temperature,
        top_p: 0.95,
        repetition_penalty: 1.1,
        do_sample: true
      }
    });
    
    // קבלת הטקסט מהתשובה
    const generatedText = response.generated_text || '';
    
    // חילוץ החלק הרלוונטי מהתשובה (רק האיטרציה האחרונה)
    // חלק מהמודלים עשויים להחזיר את הפרומפט המקורי בתחילת התשובה
    const cleanedResponse = generatedText.includes('[/INST]') 
      ? generatedText.split('[/INST]')[1].trim() 
      : generatedText;
    
    // חילוץ מקורות מהתגובה באמצעות המודול המיוחד
    const sources = extractSources(cleanedResponse);
    
    // החזרת התשובה והמקורות
    return NextResponse.json({
      response: cleanedResponse,
      sources
    });
    
  } catch (error) {
    console.error('שגיאה בעיבוד בקשת AI:', error);
    return NextResponse.json(
      { error: 'אירעה שגיאה במהלך עיבוד הבקשה', details: error.message },
      { status: 500 }
    );
  }
}