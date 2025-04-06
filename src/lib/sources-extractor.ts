// src/lib/sources-extractor.ts

export interface Source {
    title: string;
    authors?: string;
    year?: string | number;
    url?: string;
    relevance: number;
    summary?: string;
  }
  
  /**
   * מחלץ מקורות מתוך תשובת ה-AI
   * פונקציה מותאמת למודלים של Hugging Face שעשויים להחזיר פורמט פחות מובנה
   * @param text התשובה המלאה מה-AI
   * @returns מערך של מקורות שחולצו
   */
  export function extractSources(text: string): Source[] {
    const sources: Source[] = [];
    
    // 1. חיפוש מקורות בפורמט המובנה שהגדרנו
    const structuredSourceRegex = /SOURCE:\s*(.+?)(?:\s*AUTHORS:\s*(.+?))?(?:\s*YEAR:\s*(\d{4}))?(?:\s*RELEVANCE:\s*(\d+)%?)?(?:\s*URL:\s*(.+?))?(?:\s*SUMMARY:\s*(.+?))?(?=SOURCE:|$)/gs;
    
    let match;
    while ((match = structuredSourceRegex.exec(text)) !== null) {
      const [_, title, authors, year, relevance, url, summary] = match.map(m => m?.trim());
      
      if (title) { // רק אם יש כותרת תקפה
        sources.push({
          title: title || 'מקור לא ידוע',
          authors: authors,
          year: year,
          url: url || '#',
          relevance: parseInt(relevance || '85'), // ברירת מחדל אם לא צוין
          summary: summary
        });
      }
    }
    
    // 2. אם לא נמצאו מקורות מובנים, ננסה לזהות פורמט פחות מובנה
    if (sources.length === 0) {
      // חיפוש מקורות בפורמט פשוט יותר - מותאם למודלים קטנים יותר
      const simpleSourceRegex = /מקור(?:\s*\d*)?:\s*(.+?)(?:\n|$)/gm;
      
      let match;
      let index = 0;
      while ((match = simpleSourceRegex.exec(text)) !== null) {
        const sourceInfo = match[1].trim();
        
        // נסיון לחלץ מידע נוסף
        const yearMatch = sourceInfo.match(/\((\d{4})\)/);
        const year = yearMatch ? yearMatch[1] : '';
        
        // חישוב ציון רלוונטיות פשוט
        const relevance = 90 - (index * 5);
        
        sources.push({
          title: sourceInfo,
          year,
          url: '#',
          relevance: Math.max(relevance, 50),  // לא יורד מתחת ל-50%
          summary: ''
        });
        
        index++;
      }
    }
    
    // 3. חיפוש מקורות בפורמט ציטוטים רגילים
    if (sources.length === 0) {
      // חיפוש מקורות בפורמט של ציטוטים רגילים
      const citationRegex = /(?:^|\n)(?:\d+\.\s*)?"?([^"]+)"?,?\s+(?:\()?(?:([א-ת\w][\w\s,.&'-]+))?(?:,?\s*(\d{4}))?(?:\))?(?:[,.:]|$)/gm;
      
      let match;
      let index = 0;
      while ((match = citationRegex.exec(text)) !== null) {
        const [_, titleOrAuthor, possibleAuthor, year] = match;
        
        // קביעה האם החלק הראשון הוא כותרת או מחבר
        let title = titleOrAuthor;
        let authors = possibleAuthor;
        
        if (titleOrAuthor && titleOrAuthor.length < 20 && !possibleAuthor) {
          // אם החלק הראשון קצר ואין חלק שני, כנראה שזה שם המחבר
          authors = titleOrAuthor;
          title = 'פרטי המאמר לא זוהו במלואם';
        }
        
        // חישוב ציון רלוונטיות
        const relevance = 85 - (index * 5);
        
        sources.push({
          title: title?.trim(),
          authors: authors?.trim(),
          year,
          url: '#',
          relevance: Math.max(relevance, 50),
          summary: ''
        });
        
        index++;
      }
    }
    
    // 4. חיפוש בפורמט הכי פשוט - רק אם אין שום תוצאות אחרות
    if (sources.length === 0) {
      // חיפוש פשוט של שורות עם מילים כמו "מאמר", "ספר" וכדומה
      const simpleLines = text.split('\n')
        .filter(line => 
          /(?:מאמר|ספר|מחקר|פרסום|עבודה|תזה)/.test(line) && 
          line.length > 20 && 
          line.length < 200)
        .map(line => line.trim());
        
      simpleLines.forEach((line, index) => {
        // ניקוי הטקסט
        const cleanedText = line.replace(/^[\d\s.-]*/, '').trim();
        
        // חילוץ שנה אם יש
        const yearMatch = cleanedText.match(/\b(19|20)\d{2}\b/);
        const year = yearMatch ? yearMatch[0] : '';
        
        sources.push({
          title: cleanedText,
          year,
          url: '#',
          relevance: Math.max(80 - (index * 3), 50),
          summary: ''
        });
      });
    }
    
    return sources;
  }