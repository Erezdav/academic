import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import { mockSources, filterSources, getAPACitation } from '../services/academicSourceService';
import type { AcademicSource } from './SearchResults';

const ImprovedAcademicSearch: React.FC = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AcademicSource[]>(mockSources);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    sourceType: 'all',
    field: 'all',
    language: 'all',
    access: 'all',
    yearRange: 'all',
    semanticSearch: false
  });

  // Handle search
  const handleSearch = () => {
    const results = filterSources(
      mockSources,
      searchQuery,
      filters,
      filters.semanticSearch
    );
    setSearchResults(results);
  };

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle semantic search toggle
  const handleSemanticSearchToggle = (enabled: boolean) => {
    setFilters(prev => ({
      ...prev,
      semanticSearch: enabled
    }));
  };

  // Toggle abstract expansion
  const toggleAbstract = (id: number) => {
    if (expandedAbstract === id) {
      setExpandedAbstract(null);
    } else {
      setExpandedAbstract(id);
    }
  };

  // Copy citation to clipboard
  const copyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    alert('הציטוט הועתק ללוח');
  };

  // Run search when filters change
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="container mx-auto p-4" dir="rtl">
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
          <FaFilter className="ml-2" />
          סינון
        </button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <SearchFilters 
          onFilterChange={handleFilterChange}
          onSemanticSearchToggle={handleSemanticSearchToggle}
          filters={filters}
        />
      )}
      
      {/* Search Results */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">תוצאות חיפוש ({searchResults.length})</h2>
        
        <SearchResults 
          results={searchResults}
          expandedAbstract={expandedAbstract}
          toggleAbstract={toggleAbstract}
          copyCitation={copyCitation}
          getAPACitation={getAPACitation}
        />
      </div>
    </div>
  );
};

export default ImprovedAcademicSearch;
