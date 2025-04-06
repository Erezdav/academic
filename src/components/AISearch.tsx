'use client';

import { useState, useEffect } from 'react';
import { FaRobot, FaSearch, FaSpinner, FaFileUpload, FaFilePdf, FaFileWord, FaExternalLinkAlt } from 'react-icons/fa';

// טיפוסים
interface AIResponse {
  id: string;
  text: string;
  sources?: {
    title: string;
    authors?: string;
    year?: string | number;
    url?: string;
    relevance: number;
    summary?: string;
  }[];
}

export default function AISearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('default'); // לאפשר למשתמש לבחור מודל

  // פונקציה לבצע בקשה ל-AI
  const fetchAIResponse = async (query: string, documents?: any[]) => {
    setIsSearching(true);
    setError(null);
    
    try {
      // יצירת FormData למקרה שנשלחים קבצים
      const formData = new FormData();
      formData.append('query', query);
      formData.append('model', selectedModel);
      
      // הוספת קבצים אם יש
      if (documents && documents.length > 0) {
        documents.forEach((doc, index) => {
          formData.append(`document_${index}`, doc.file);
        });
      }
      
      // פרומפט מותאם - ניתן להעביר בקשת API
      const customPrompt = {
        systemPrompt: `אתה עוזר אקדמי המתמחה בעזרה לסטודנטים בחיפוש מקורות אקדמיים ומענה על שאלות בתחום המחקר האקדמי.
        תשובותיך צריכות להיות:
        1. אקדמיות ומבוססות מחקר
        2. עשירות במקורות ומידע רלוונטי
        3. כתובות בעברית ברורה ומדויקת
        4. שומרות על כבוד האקדמיה והמחקר
        אם נשאלת על כתיבת עבודה אקדמית, הצע עזרה והפניה למקורות אבל לא תכתוב עבודה במקום הסטודנט.`
      };
      
      formData.append('customPrompt', JSON.stringify(customPrompt));
      
      // שליחת הבקשה ל-API
      console.log('שולח בקשה לשרת...');
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `שגיאת שרת: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('תשובה התקבלה:', data);
      
      // הוספת התשובה החדשה לרשימת התשובות
      setAiResponses(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          text: data.response,
          sources: data.sources || []
        }
      ]);
    } catch (err) {
      console.error('שגיאה בבקשה:', err);
      setError(err instanceof Error ? err.message : 'אירעה שגיאה בתהליך החיפוש');
    } finally {
      setIsSearching(false);
    }
  };
  
  // טיפול בשליחת החיפוש
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // פנייה ל-AI עם השאילתה
    fetchAIResponse(searchQuery, uploadedDocuments);
  };
  
  // טיפול בהעלאת קבצים
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // בדיקת גודל הקובץ (מקסימום 5MB למודלים של Hugging Face)
      if (file.size > 5 * 1024 * 1024) {
        setError('הקובץ גדול מדי. הגודל המקסימלי המותר הוא 5MB.');
        setSelectedFile(null);
        return;
      }
      
      // הוספת הקובץ לרשימת הקבצים
      const newDocument = {
        id: uploadedDocuments.length + 1,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toLocaleDateString(),
        file: file
      };
      
      setUploadedDocuments(prev => [...prev, newDocument]);
      setSelectedFile(null);
    }
  };
  
  // קבלת סוג הקובץ והאייקון המתאים
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    if (fileType.includes('word') || fileType.includes('docx') || fileType.includes('doc')) return <FaFileWord className="text-blue-500" />;
    return <FaFileUpload />;
  };
  
  // פונקציה להסרת קובץ
  const removeFile = (id: number) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  // רשימת המודלים לבחירה
  const models = [
    { id: 'default', name: 'מודל מומלץ (Mistral)' },
    { id: 'hebrew', name: 'מודל מותאם לעברית (Phi-2)' },
    { id: 'academic', name: 'מודל למחקר אקדמי (Llama 2)' },
    { id: 'fast', name: 'מודל מהיר (Gemma)' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaRobot className="text-primary-500 text-2xl ml-2" />
          <h3 className="text-xl font-bold">חיפוש חכם מבוסס AI</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          חיפוש מתקדם המנתח את השאלה שלך ומוצא את המקורות האקדמיים הרלוונטיים ביותר. 
          אתה יכול גם להעלות מסמכים שלך לניתוח.
        </p>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="mb-4">
            <label htmlFor="model" className="block text-gray-700 font-medium mb-1">
              בחר מודל AI:
            </label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4"
            >
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          
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
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 rounded-l-md transition-colors disabled:bg-gray-400 flex items-center justify-center"
              disabled={isSearching}
            >
              {isSearching ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            </button>
          </div>
        </form>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">העלאת מסמכים לניתוח</h4>
          <p className="text-sm text-gray-600 mb-3">
            העלה מסמך Word, PDF או טקסט כדי שה-AI יוכל לנתח אותו ולהציע מקורות רלוונטיים (עד 5MB).
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
                <p className="text-xs text-gray-500 mt-1">מסמכי Word, PDF או טקסט (עד 5MB)</p>
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
          
          {error && (
            <div className="mt-3 text-red-500 text-sm">
              {error}
            </div>
          )}
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
                  <button 
                    onClick={() => removeFile(doc.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    הסר
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {isSearching && (
        <div className="text-center py-10">
          <FaSpinner className="animate-spin text-primary-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">מחפש תשובה... (עשוי לקחת עד 30 שניות)</p>
        </div>
      )}
      
      {aiResponses.length > 0 && !isSearching && (
        <div>
          <h4 className="text-lg font-semibold mb-4">תשובות AI</h4>
          <div className="space-y-6">
            {aiResponses.map(response => (
              <div key={response.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="prose max-w-none mb-4">
                  {/* כאן נעשה עיבוד לטקסט כדי לשמור על עיצוב הפסקאות */}
                  {response.text.split('\n').map((paragraph, idx) => (
                    <p key={idx} className={paragraph.trim() === '' ? 'h-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {response.sources && response.sources.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h5 className="font-semibold text-gray-700 mb-2">מקורות:</h5>
                    <ul className="space-y-2">
                      {response.sources.map((source, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 mt-1">
                            התאמה: {source.relevance}%
                          </span>
                          <div>
                            <p className="font-medium text-primary-700">{source.title}</p>
                            {source.authors && (
                              <p className="text-sm text-gray-600">{source.authors} {source.year && `(${source.year})`}</p>
                            )}
                            {source.summary && (
                              <p className="text-sm text-gray-600 mt-1">{source.summary}</p>
                            )}
                            {source.url && source.url !== '#' && (
                              <a 
                                href={source.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:underline text-sm flex items-center mt-1"
                              >
                                צפה במקור <FaExternalLinkAlt className="mr-1 text-xs" />
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}