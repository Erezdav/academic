import React, { useState } from 'react';
import { FaSearch, FaFilter, FaBook, FaFileAlt, FaGraduationCap, FaCalendarAlt, FaGlobe } from 'react-icons/fa';

// Mock data for academic sources
const mockSources = [
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

// Type definitions
type SourceType = "מאמר אקדמי" | "סקירת ספרות" | "עבודת דוקטורט" | "מאמר כנס" | "ספר" | "הכל";
type FieldType = "חינוך" | "פסיכולוגיה" | "רפואה" | "משפטים" | "סוציולוגיה" | "תכנון עירוני" | "בלשנות" | "הכל";
type LanguageType = "עברית" | "אנגלית" | "הכל";
type AccessType = "פתוח" | "מנוי" | "הכל";
type YearRangeType = "הכל" | "שנה אחרונה" | "3 שנים אחרונות" | "5 שנים אחרונות" | "10 שנים אחרונות";

// Component for academic source search
const AcademicSourceSearch = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(mockSources);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);
  
  // Filter states
  const [sourceType, setSourceType] = useState<SourceType>("הכל");
  const [field, setField] = useState<FieldType>("הכל");
  const [language, setLanguage] = useState<LanguageType>("הכל");
  const [access, setAccess] = useState<AccessType>("הכל");
  const [yearRange, setYearRange] = useState<YearRangeType>("הכל");
  const [useSemanticSearch, setUseSemanticSearch] = useState(false);

  // Handle search
  const handleSearch = () => {
    let results = [...mockSources];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      results = results.filter(source => 
        source.title.includes(searchQuery) || 
        source.abstract.includes(searchQuery) || 
        source.authors.includes(searchQuery)
      );
    }
    
    // Apply filters
    if (sourceType !== "הכל") {
      results = results.filter(source => source.type === sourceType);
    }
    
    if (field !== "הכל") {
      results = results.filter(source => source.field === field);
    }
    
    if (language !== "הכל") {
      results = results.filter(source => source.language === language);
    }
    
    if (access !== "הכל") {
      results = results.filter(source => source.access === access);
    }
    
    // Filter by year range
    if (yearRange !== "הכל") {
      const currentYear = new Date().getFullYear();
      let yearLimit: number;
      
      switch (yearRange) {
        case "שנה אחרונה":
          yearLimit = currentYear - 1;
          break;
        case "3 שנים אחרונות":
          yearLimit = currentYear - 3;
          break;
        case "5 שנים אחרונות":
          yearLimit = currentYear - 5;
          break;
        case "10 שנים אחרונות":
          yearLimit = currentYear - 10;
          break;
        default:
          yearLimit = 0;
      }
      
      results = results.filter(source => source.year >= yearLimit);
    }
    
    setSearchResults(results);
  };

  // Toggle abstract expansion
  const toggleAbstract = (id: number) => {
    if (expandedAbstract === id) {
      setExpandedAbstract(null);
    } else {
      setExpandedAbstract(id);
    }
  };

  // Get citation in APA format
  const getAPACitation = (source: typeof mockSources[0]) => {
    return `${source.authors} (${source.year}). ${source.title}. ${source.journal}.`;
  };

  // Copy citation to clipboard
  const copyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    alert('הציטוט הועתק ללוח');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary-600">חיפוש מקורות אקדמיים</h1>
      
      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="הקלד נושא מחקר, שאלת מחקר או מילות מפתח..."
            className="w-full p-3 border border-gray-300 rounded-md pr-10"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
        
        <button
          onClick={handleSearch}
          className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
        >
          חפש
        </button>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-200 text-gray-800 px-4 py-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <FaFilter className="mr-2" />
          סינון
        </button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">סינון מתקדם</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Source Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סוג מקור</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as SourceType)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="הכל">הכל</option>
                <option value="מאמר אקדמי">מאמר אקדמי</option>
                <option value="סקירת ספרות">סקירת ספרות</option>
                <option value="עבודת דוקטורט">עבודת דוקטורט</option>
                <option value="מאמר כנס">מאמר כנס</option>
                <option value="ספר">ספר</option>
              </select>
            </div>
            
            {/* Field Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תחום אקדמי</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as FieldType)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="הכל">הכל</option>
                <option value="חינוך">חינוך</option>
                <option value="פסיכולוגיה">פסיכולוגיה</option>
                <option value="רפואה">רפואה</option>
                <option value="משפטים">משפטים</option>
                <option value="סוציולוגיה">סוציולוגיה</option>
                <option value="תכנון עירוני">תכנון עירוני</option>
                <option value="בלשנות">בלשנות</option>
              </select>
            </div>
            
            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שפה</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageType)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="הכל">הכל</option>
                <option value="עברית">עברית</option>
                <option value="אנגלית">אנגלית</option>
              </select>
            </div>
            
            {/* Access Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">זמינות</label>
              <select
                value={access}
                onChange={(e) => setAccess(e.target.value as AccessType)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="הכל">הכל</option>
                <option value="פתוח">גישה פתוחה</option>
                <option value="מנוי">דורש מנוי</option>
              </select>
            </div>
            
            {/* Year Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">טווח שנים</label>
              <select
                value={yearRange}
                onChange={(e) => setYearRange(e.target.value as YearRangeType)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="הכל">הכל</option>
                <option value="שנה אחרונה">שנה אחרונה</option>
                <option value="3 שנים אחרונות">3 שנים אחרונות</option>
                <option value="5 שנים אחרונות">5 שנים אחרונות</option>
                <option value="10 שנים אחרונות">10 שנים אחרונות</option>
              </select>
            </div>
            
            {/* Semantic Search Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="semanticSearch"
                checked={useSemanticSearch}
                onChange={() => setUseSemanticSearch(!useSemanticSearch)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
              <label htmlFor="semanticSearch" className="mr-2 block text-sm text-gray-700">
                הפעל חיפוש סמנטי (הבנת משמעות)
              </label>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              החל סינון
            </button>
          </div>
        </div>
      )}
      
      {/* Search Results */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">תוצאות חיפוש ({searchResults.length})</h2>
        
        {searchResults.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">לא נמצאו תוצאות מתאימות. נסה לשנות את מונחי החיפוש או הסינון.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {searchResults.map((source) => (
              <div key={source.id} className="bg-white p-4 rounded-md shadow-md border border-gray-200">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <FaBook className="ml-1" /> {source.type}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <FaFileAlt className="ml-1" /> {source.field}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <FaCalendarAlt className="ml-1" /> {source.year}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <FaGlobe className="ml-1" /> {source.language}
                  </span>
                  <span className={`${source.access === 'פתוח' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs px-2 py-1 rounded-full flex items-center`}>
                    {source.access === 'פתוח' ? 'גישה פתוחה' : 'דורש מנוי'}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-1">{source.title}</h3>
                <p className="text-gray-700 mb-2">{source.authors}</p>
                <p className="text-gray-600 mb-2">{source.journal}</p>
                
                <div className="mb-3">
                  <p className={`text-gray-700 ${expandedAbstract === source.id ? '' : 'line-clamp-2'}`}>
                    {source.abstract}
                  </p>
                  <button
                    onClick={() => toggleAbstract(source.id)}
                    className="text-primary-600 text-sm mt-1 hover:underline"
                  >
                    {expandedAbstract === source.id ? 'הצג פחות' : 'הצג יותר'}
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700 transition-colors"
                  >
                    צפה במקור
                  </a>
                  <button
                    onClick={() => copyCitation(getAPACitation(source))}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition-colors"
                  >
                    העתק ציטוט (APA)
                  </button>
                  <span className="text-gray-600 text-sm flex items-center">
                    <FaGraduationCap className="ml-1" /> {source.citations} ציטוטים
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicSourceSearch;
