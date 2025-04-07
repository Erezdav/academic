'use client';

import { useState } from 'react';

// Custom SVG Icons
const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm10 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-5-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function HomeAISearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResponse('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('query', searchQuery);
      
      const customPrompt = {
        systemPrompt: `אתה עוזר אקדמי שמסייע במתן מידע כללי וראשוני. 
        ענה בתמציתיות וספק מבט כללי או הכוונה ראשונית לנושא שנשאל.`
      };
      
      formData.append('customPrompt', JSON.stringify(customPrompt));
      
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה בחיפוש');
      }
      
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'אירעה שגיאה. אנא נסה שוב.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-heading">
            חיפוש חכם מבוסס AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            חפש מידע אקדמי, קבל תשובות וייעוץ מיידי מהעוזר האקדמי שלנו
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-4">
            <RobotIcon />
            <h3 className="text-xl font-bold mr-2">עוזר אקדמי חכם</h3>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="שאל שאלה אקדמית או חפש מידע..."
                className="flex-1 border border-gray-300 rounded-r-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="rtl"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 rounded-l-md transition-colors disabled:bg-gray-400 flex items-center justify-center"
                disabled={isSearching}
              >
                {isSearching ? <SpinnerIcon /> : <SearchIcon />}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {isSearching && (
            <div className="text-center py-6">
              <SpinnerIcon />
              <p className="text-gray-600 mt-4">מחפש תשובה... (עשוי לקחת עד 30 שניות)</p>
            </div>
          )}
          
          {aiResponse && !isSearching && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}