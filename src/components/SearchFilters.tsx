import React from 'react';
import { FaSearch, FaBook, FaUniversity, FaGlobe, FaCalendarAlt, FaLock, FaLockOpen } from 'react-icons/fa';

// Type definitions for filter options
type FilterOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

// Filter options
const sourceTypes: FilterOption[] = [
  { id: 'all', label: 'הכל' },
  { id: 'article', label: 'מאמר אקדמי', icon: <FaBook /> },
  { id: 'review', label: 'סקירת ספרות' },
  { id: 'thesis', label: 'עבודת דוקטורט' },
  { id: 'conference', label: 'מאמר כנס' },
  { id: 'book', label: 'ספר' }
];

const academicFields: FilterOption[] = [
  { id: 'all', label: 'הכל' },
  { id: 'education', label: 'חינוך' },
  { id: 'psychology', label: 'פסיכולוגיה' },
  { id: 'medicine', label: 'רפואה' },
  { id: 'law', label: 'משפטים' },
  { id: 'sociology', label: 'סוציולוגיה' },
  { id: 'urban', label: 'תכנון עירוני' },
  { id: 'linguistics', label: 'בלשנות' }
];

const languages: FilterOption[] = [
  { id: 'all', label: 'הכל' },
  { id: 'hebrew', label: 'עברית', icon: <FaGlobe /> },
  { id: 'english', label: 'אנגלית', icon: <FaGlobe /> }
];

const accessTypes: FilterOption[] = [
  { id: 'all', label: 'הכל' },
  { id: 'open', label: 'גישה פתוחה', icon: <FaLockOpen /> },
  { id: 'subscription', label: 'דורש מנוי', icon: <FaLock /> }
];

const yearRanges: FilterOption[] = [
  { id: 'all', label: 'הכל' },
  { id: 'last1', label: 'שנה אחרונה', icon: <FaCalendarAlt /> },
  { id: 'last3', label: 'שנים אחרונות 3', icon: <FaCalendarAlt /> },
  { id: 'last5', label: 'שנים אחרונות 5', icon: <FaCalendarAlt /> },
  { id: 'last10', label: 'שנים אחרונות 10', icon: <FaCalendarAlt /> }
];

// Filter component
const SearchFilters: React.FC<{
  onFilterChange: (filterType: string, value: string) => void;
  onSemanticSearchToggle: (enabled: boolean) => void;
  filters: {
    sourceType: string;
    field: string;
    language: string;
    access: string;
    yearRange: string;
    semanticSearch: boolean;
  };
}> = ({ onFilterChange, onSemanticSearchToggle, filters }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">סינון מתקדם</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Source Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">סוג מקור</label>
          <select
            value={filters.sourceType}
            onChange={(e) => onFilterChange('sourceType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {sourceTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
        
        {/* Field Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">תחום אקדמי</label>
          <select
            value={filters.field}
            onChange={(e) => onFilterChange('field', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {academicFields.map(field => (
              <option key={field.id} value={field.id}>{field.label}</option>
            ))}
          </select>
        </div>
        
        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שפה</label>
          <select
            value={filters.language}
            onChange={(e) => onFilterChange('language', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>
        
        {/* Access Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">זמינות</label>
          <select
            value={filters.access}
            onChange={(e) => onFilterChange('access', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {accessTypes.map(access => (
              <option key={access.id} value={access.id}>{access.label}</option>
            ))}
          </select>
        </div>
        
        {/* Year Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">טווח שנים</label>
          <select
            value={filters.yearRange}
            onChange={(e) => onFilterChange('yearRange', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {yearRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
        </div>
        
        {/* Semantic Search Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="semanticSearch"
            checked={filters.semanticSearch}
            onChange={(e) => onSemanticSearchToggle(e.target.checked)}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded"
          />
          <label htmlFor="semanticSearch" className="mr-2 block text-sm text-gray-700">
            הפעל חיפוש סמנטי (הבנת משמעות)
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
