'use client';

import { useState } from 'react';
import { FaRobot, FaSearch, FaSpinner, FaFileUpload, FaFilePdf, FaFileWord } from 'react-icons/fa';

export default function AISearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  
  // סימולציה של חיפוש AI
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    // סימולציה של תגובה מעוכבת מה-AI
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "השפעת למידה מרחוק על הישגים אקדמיים",
          snippet: "מחקר זה בוחן את ההשפעה של למידה מרחוק על הישגים אקדמיים של סטודנטים במוסדות להשכלה גבוהה בישראל במהלך תקופת הקורונה...",
          relevance: 92,
          source: "כתב עת ישראלי לחינוך (2022)",
          url: "/sources/1",
        },
        {
          id: 2,
          title: "אסטרטגיות ללמידה יעילה בסביבה דיגיטלית",
          snippet: "מאמר זה מציג אסטרטגיות מבוססות מחקר ללמידה יעילה בסביבה דיגיטלית, בהתבסס על עקרונות קוגניטיביים ופדגוגיים...",
          relevance: 87,
          source: "מגמות בפסיכולוגיה (2021)",
          url: "/sources/2",
        },
        {
          id: 3,
          title: "השפעת טכנולוגיות למידה חדשניות על מוטיבציה של סטודנטים",
          snippet: "מחקר זה בוחן כיצד שימוש בטכנולוגיות למידה חדשניות משפיע על מוטיבציה של סטודנטים. הממצאים מראים שילוב טכנולוגיות למידה מגביר את המוטיבציה...",
          relevance: 81,
          source: "מחקר חינוכי (2023)",
          url: "/sources/3",
        },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };
  
  // טיפול בהעלאת קבצים
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // סימולציה של עיבוד הקובץ
      setTimeout(() => {
        const newDocument = {
          id: uploadedDocuments.length + 1,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toLocaleDateString(),
        };
        
        setUploadedDocuments(prev => [...prev, newDocument]);
        setSelectedFile(null);
      }, 1500);
    }
  };
  
  // קבלת סוג הקובץ והאייקון המתאים
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('word') || fileType.includes('docx') || fileType.includes('doc')) return <FaFileWord className="text-blue-500" />;
    return <FaFileUpload />;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaRobot className="text-primary-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">חיפוש חכם מבוסס AI</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          חיפוש מתקדם המנתח את השאלה שלך ומוצא את המקורות האקדמיים הרלוונטיים ביותר. 
          אתה יכול גם להעלות מסמכים שלך לניתוח.
        </p>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="הקלד שאלת מחקר, נושא או תחום עניין..."
              className="flex-1 border border-gray-300 rounded-r-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir="rtl"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 rounded-l-md transition-colors disabled:bg-gray-400"
              disabled={isSearching}
            >
              {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            </button>
          </div>
        </form>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">העלאת מסמכים לניתוח</h4>
          <p className="text-sm text-gray-600 mb-3">
            העלה מסמך Word, PDF או טקסט כדי שה-AI יוכל לנתח אותו ולהציע מקורות רלוונטיים.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".doc,.docx,.pdf,.txt"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-gray-400 text-3xl mb-2" />
                <p className="text-primary-500 font-medium">לחץ להעלאה או גרור לכאן קובץ</p>
                <p className="text-xs text-gray-500 mt-1">מסמכי Word, PDF או טקסט (עד 10MB)</p>
              </div>
            </label>
            
            {selectedFile && (
              <div className="mt-4 text-sm">
                <p>מעלה: {selectedFile.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-primary-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {uploadedDocuments.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">מסמכים שהועלו</h4>
            <ul className="divide-y divide-gray-200">
              {uploadedDocuments.map(doc => (
                <li key={doc.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {getFileIcon(doc.type)}
                    <span className="mr-2 text-gray-700">{doc.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {searchResults.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-4">תוצאות חיפוש</h4>
          <div className="space-y-4">
            {searchResults.map(result => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-lg font-semibold text-primary-700">{result.title}</h5>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    התאמה: {result.relevance}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{result.source}</p>
                <p className="text-gray-700 mb-3">{result.snippet}</p>
                <a 
                  href={result.url} 
                  className="text-primary-500 hover:underline text-sm font-medium"
                >
                  צפה במקור המלא
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}