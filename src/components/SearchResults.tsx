import React from 'react';
import { FaBook, FaFileAlt, FaCalendarAlt, FaGlobe, FaGraduationCap } from 'react-icons/fa';

// Type for academic source
export type AcademicSource = {
  id: number;
  title: string;
  authors: string;
  year: number;
  journal: string;
  type: string;
  field: string;
  language: string;
  abstract: string;
  url: string;
  access: string;
  citations: number;
};

// Props for the component
interface SearchResultsProps {
  results: AcademicSource[];
  expandedAbstract: number | null;
  toggleAbstract: (id: number) => void;
  copyCitation: (citation: string) => void;
  getAPACitation: (source: AcademicSource) => string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  expandedAbstract,
  toggleAbstract,
  copyCitation,
  getAPACitation
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">לא נמצאו תוצאות מתאימות. נסה לשנות את מונחי החיפוש או הסינון.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((source) => (
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
  );
};

export default SearchResults;
