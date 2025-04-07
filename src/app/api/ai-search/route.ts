import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Mock response for development when no API key is available
const mockAIResponse = {
  response: `שלום! אני העוזר האקדמי של אקדמיק. למרות שכרגע אין חיבור למודל AI, אני יכול לספק תשובה כללית.

אם יש לך שאלה אקדמית, אנסה לעזור במידת האפשר. לדוגמה, אם אתה מחפש עזרה בכתיבה אקדמית, הנה כמה טיפים כלליים:

1. הגדר את מטרת העבודה בצורה ברורה
2. ערוך סקירת ספרות מקיפה
3. השתמש במקורות אמינים ועדכניים
4. שמור על מבנה אקדמי תקני
5. הקפד על ציטוטים ורפרנסים נכונים

אם תרצה סיוע ספציפי יותר, אנא פרט את השאלה שלך.`,
  sources: [
    {
      title: "טיפים לכתיבה אקדמית מוצלחת",
      authors: "צוות אקדמיק",
      year: 2024,
      relevance: 100,
      url: "/academic-writing-tips",
      summary: "מדריך בסיסי לכתיבה אקדמית איכותית"
    }
  ]
};
export async function POST(req: NextRequest) {
    try {
      // Validate API key
      const apiKey = process.env.HUGGINGFACE_API_KEY;
      if (!apiKey) {
        console.error('❌ HUGGINGFACE_API_KEY is not set in .env.local');
        throw new Error('API key is missing');
      }
  
      // Initialize Hugging Face client
      const hf = new HfInference(apiKey);
  
      // Parse form data
      const formData = await req.formData();
      const query = formData.get('query') as string;
      
      // Validate query
      if (!query) {
        console.error('❌ No query provided');
        return NextResponse.json(
          { error: 'לא סופקה שאילתה' },
          { status: 400 }
        );
      }
  
      // Select model (with fallback)
      const model = process.env.HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
      console.log(`🔍 Using model: ${model}`);
  
      // Prepare prompt
      const fullPrompt = `
      <s>[INST] אתה עוזר אקדמי מקצועי המסייע לסטודנטים במחקר אקדמי. 
      תפקידך לספק מענה מעמיק, מדויק ומקצועי.
  
      הנחיות מרכזיות:
      - ענה בעברית ברורה ומדויקת
      - הבא דוגמאות ומקורות רלוונטיים
      - שמור על רמה אקדמית גבוהה
      - הצג מידע מאוזן ומעמיק
  
      השאלה: ${query}
      
      תשובה:[/INST]`;
  
      try {
        // Generate response
        const response = await hf.textGeneration({
          model: model,
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.9,
            repetition_penalty: 1.1
          }
        });
  
        // Extract and clean response
        const generatedText = response.generated_text || '';
        const cleanedResponse = generatedText.includes('[/INST]') 
          ? generatedText.split('[/INST]')[1].trim() 
          : generatedText.trim();
  
        console.log('✅ Successfully generated response');
  
        return NextResponse.json({
          response: cleanedResponse,
          sources: [] // ניתן להוסיף מנגנון חילוץ מקורות בעתיד
        });
  
      } catch (generationError) {
        console.error('❌ Error during text generation:', generationError);
        
        // More detailed error logging
        if (generationError instanceof Error) {
          console.error('Error name:', generationError.name);
          console.error('Error message:', generationError.message);
          console.error('Error stack:', generationError.stack);
        }
  
        return NextResponse.json(
          { 
            error: 'שגיאה בהפקת תשובת AI', 
            details: generationError instanceof Error ? generationError.message : 'שגיאה לא מזוהה' 
          },
          { status: 500 }
        );
      }
      
    } catch (error) {
      console.error('❌ שגיאת AI כללית:', error);
      
      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
  
      return NextResponse.json(
        { 
          error: 'אירעה שגיאה בעיבוד הבקשה', 
          details: error instanceof Error ? error.message : 'שגיאה לא מזוהה' 
        },
        { status: 500 }
      );
    }
  }