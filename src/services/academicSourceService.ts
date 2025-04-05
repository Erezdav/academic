// Mock data for academic sources
export const mockSources = [
  {
    id: 1,
    title: "השפעת למידה מרחוק על הישגים אקדמיים בתקופת הקורונה",
    authors: "כהן, ד., לוי, א.",
    year: 2022,
    journal: "כתב עת ישראלי לחינוך",
    type: "מאמר אקדמי",
    field: "חינוך",
    language: "עברית",
    abstract: "מחקר זה בוחן את ההשפעה של למידה מרחוק על הישגים אקדמיים של סטודנטים במוסדות להשכלה גבוהה בישראל במהלך תקופת הקורונה. המחקר מצא כי למרות האתגרים, סטודנטים רבים הצליחו להסתגל ללמידה מרחוק, אם כי נמצאו פערים משמעותיים בין אוכלוסיות שונות.",
    url: "https://example.com/article1",
    access: "פתוח",
    citations: 24
  },
  {
    id: 2,
    title: "מגמות חדשות בפסיכולוגיה קוגניטיבית: סקירת ספרות",
    authors: "רוזנברג, ש., אברהם, מ.",
    year: 2021,
    journal: "מגמות בפסיכולוגיה",
    type: "סקירת ספרות",
    field: "פסיכולוגיה",
    language: "עברית",
    abstract: "סקירה זו מציגה את המגמות העדכניות ביותר בתחום הפסיכולוגיה הקוגניטיבית, תוך התמקדות בהתפתחויות של העשור האחרון. הסקירה מתייחסת למחקרים פורצי דרך בתחומי הזיכרון, הקשב, ותהליכי חשיבה וקבלת החלטות.",
    url: "https://example.com/article2",
    access: "מנוי",
    citations: 37
  },
  {
    id: 3,
    title: "The Impact of Artificial Intelligence on Modern Healthcare Systems",
    authors: "Smith, J., Johnson, R.",
    year: 2023,
    journal: "Journal of Medical Informatics",
    type: "מאמר אקדמי",
    field: "רפואה",
    language: "אנגלית",
    abstract: "This study examines how artificial intelligence technologies are transforming healthcare delivery, diagnosis, and treatment planning. The research highlights both the benefits and challenges of AI implementation in clinical settings.",
    url: "https://example.com/article3",
    access: "פתוח",
    citations: 56
  },
  {
    id: 4,
    title: "גישות חדשניות להוראת מתמטיקה בבתי ספר יסודיים",
    authors: "גולדשטיין, ר.",
    year: 2020,
    journal: "הוראת מתמטיקה",
    type: "עבודת דוקטורט",
    field: "חינוך",
    language: "עברית",
    abstract: "עבודה זו בוחנת גישות חדשניות להוראת מתמטיקה בבתי ספר יסודיים בישראל. המחקר מציג מודלים פדגוגיים חדשים ובוחן את יעילותם בשיפור הבנה מתמטית והישגים בקרב תלמידים.",
    url: "https://example.com/thesis1",
    access: "פתוח",
    citations: 12
  },
  {
    id: 5,
    title: "אתיקה ובינה מלאכותית: אתגרים משפטיים בעידן הדיגיטלי",
    authors: "לוינסון, ד., כץ, מ.",
    year: 2023,
    journal: "משפט וטכנולוגיה",
    type: "מאמר אקדמי",
    field: "משפטים",
    language: "עברית",
    abstract: "מאמר זה דן באתגרים האתיים והמשפטיים הנובעים מהתפתחות הבינה המלאכותית. המחקר מנתח מקרי בוחן ומציע מסגרת רגולטורית להתמודדות עם סוגיות של פרטיות, אחריות משפטית, והטיות אלגוריתמיות.",
    url: "https://example.com/article4",
    access: "מנוי",
    citations: 18
  },
  {
    id: 6,
    title: "Sustainable Urban Development Models for Middle Eastern Cities",
    authors: "Al-Hassan, M., Cohen, Y.",
    year: 2022,
    journal: "Urban Planning Review",
    type: "מאמר כנס",
    field: "תכנון עירוני",
    language: "אנגלית",
    abstract: "This paper presents innovative models for sustainable urban development specifically designed for Middle Eastern cities, considering their unique climate, cultural, and social characteristics.",
    url: "https://example.com/conference1",
    access: "פתוח",
    citations: 9
  },
  {
    id: 7,
    title: "השפעת רשתות חברתיות על התפתחות זהות בקרב מתבגרים",
    authors: "שפירא, ל., אורן, ט.",
    year: 2021,
    journal: "חברה ורווחה",
    type: "מאמר אקדמי",
    field: "סוציולוגיה",
    language: "עברית",
    abstract: "מחקר זה בוחן את ההשפעה של שימוש ברשתות חברתיות על התפתחות זהות אישית וחברתית בקרב מתבגרים בישראל. המחקר מצביע על הקשרים מורכבים בין נוכחות דיגיטלית, תפיסה עצמית, ויחסים חברתיים.",
    url: "https://example.com/article5",
    access: "פתוח",
    citations: 31
  },
  {
    id: 8,
    title: "חדשנות בשיטות הוראה במערכת ההשכלה הגבוהה",
    authors: "ברק, מ.",
    year: 2020,
    journal: "הוראה באקדמיה",
    type: "ספר",
    field: "חינוך",
    language: "עברית",
    abstract: "ספר זה סוקר שיטות הוראה חדשניות במערכת ההשכלה הגבוהה, תוך התמקדות בשילוב טכנולוגיה, למידה פעילה, ופדגוגיות מבוססות-מחקר. הספר כולל מקרי בוחן ממוסדות אקדמיים בישראל ובעולם.",
    url: "https://example.com/book1",
    access: "מנוי",
    citations: 45
  },
  {
    id: 9,
    title: "Neurological Markers of Language Acquisition in Bilingual Children",
    authors: "Rodriguez, C., Levin, A.",
    year: 2023,
    journal: "Neurolinguistics Today",
    type: "מאמר אקדמי",
    field: "בלשנות",
    language: "אנגלית",
    abstract: "This research identifies specific neurological markers associated with language acquisition in bilingual children, providing insights into the cognitive mechanisms that support multilingual development.",
    url: "https://example.com/article6",
    access: "מנוי",
    citations: 27
  },
  {
    id: 10,
    title: "אסטרטגיות התמודדות עם לחץ בקרב סטודנטים לרפואה",
    authors: "לוי, ר., כהן, ש.",
    year: 2022,
    journal: "רפואה וחברה",
    type: "מאמר אקדמי",
    field: "רפואה",
    language: "עברית",
    abstract: "מחקר זה בוחן אסטרטגיות התמודדות עם לחץ בקרב סטודנטים לרפואה בישראל. המחקר מזהה גורמי לחץ מרכזיים ומציע התערבויות יעילות לשיפור רווחה נפשית ומניעת שחיקה.",
    url: "https://example.com/article7",
    access: "פתוח",
    citations: 14
  }
];

// Function to filter sources based on search criteria
export const filterSources = (
  sources,
  query,
  filters,
  useSemanticSearch
) => {
  let results = [...sources];
  
  // Filter by search query
  if (query.trim() !== '') {
    results = results.filter(source => 
      source.title.includes(query) || 
      source.abstract.includes(query) || 
      source.authors.includes(query)
    );
    
    // Simulate semantic search by including results that might be conceptually related
    if (useSemanticSearch) {
      // This is a simplified simulation of semantic search
      // In a real implementation, this would use an actual NLP model
      const semanticKeywords = {
        'למידה': ['חינוך', 'הוראה', 'פדגוגיה', 'סטודנטים'],
        'בינה מלאכותית': ['AI', 'מחשוב', 'אלגוריתם', 'טכנולוגיה'],
        'פסיכולוגיה': ['קוגניטיבי', 'התנהגות', 'רגשות', 'תפיסה'],
        'רפואה': ['בריאות', 'טיפול', 'חולים', 'רופאים']
      };
      
      // Check if query contains any semantic keywords
      for (const [concept, relatedTerms] of Object.entries(semanticKeywords)) {
        if (query.includes(concept)) {
          // Add sources that contain related terms
          const additionalSources = sources.filter(source => 
            !results.includes(source) && 
            (relatedTerms.some(term => source.title.includes(term) || source.abstract.includes(term)))
          );
          results = [...results, ...additionalSources];
        }
      }
    }
  }
  
  // Apply filters
  if (filters.sourceType !== "all") {
    const sourceTypeMap = {
      'article': 'מאמר אקדמי',
      'review': 'סקירת ספרות',
      'thesis': 'עבודת דוקטורט',
      'conference': 'מאמר כנס',
      'book': 'ספר'
    };
    results = results.filter(source => source.type === sourceTypeMap[filters.sourceType]);
  }
  
  if (filters.field !== "all") {
    const fieldMap = {
      'education': 'חינוך',
      'psychology': 'פסיכולוגיה',
      'medicine': 'רפואה',
      'law': 'משפטים',
      'sociology': 'סוציולוגיה',
      'urban': 'תכנון עירוני',
      'linguistics': 'בלשנות'
    };
    results = results.filter(source => source.field === fieldMap[filters.field]);
  }
  
  if (filters.language !== "all") {
    const languageMap = {
      'hebrew': 'עברית',
      'english': 'אנגלית'
    };
    results = results.filter(source => source.language === languageMap[filters.language]);
  }
  
  if (filters.access !== "all") {
    const accessMap = {
      'open': 'פתוח',
      'subscription': 'מנוי'
    };
    results = results.filter(source => source.access === accessMap[filters.access]);
  }
  
  // Filter by year range
  if (filters.yearRange !== "all") {
    const currentYear = new Date().getFullYear();
    let yearLimit: number;
    
    switch (filters.yearRange) {
      case "last1":
        yearLimit = currentYear - 1;
        break;
      case "last3":
        yearLimit = currentYear - 3;
        break;
      case "last5":
        yearLimit = currentYear - 5;
        break;
      case "last10":
        yearLimit = currentYear - 10;
        break;
      default:
        yearLimit = 0;
    }
    
    results = results.filter(source => source.year >= yearLimit);
  }
  
  return results;
};

// Get citation in APA format
export const getAPACitation = (source) => {
  return `${source.authors} (${source.year}). ${source.title}. ${source.journal}.`;
};
