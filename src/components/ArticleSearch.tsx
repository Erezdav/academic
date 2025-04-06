'use client';

import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';
import { FaSearch, FaFilter, FaBook, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ArticleSearch({ lng }) {
  const { t, dir } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    year: 'all'
  });
  
  // Mock articles data - in a real application, this would come from an API or database
  const articles = [
    {
      id: 1,
      title: 'כיצד לכתוב עבודה סמינריונית מצטיינת',
      titleEn: 'How to Write an Excellent Seminar Paper',
      titleAr: 'كيفية كتابة ورقة ندوة ممتازة',
      category: 'guides',
      level: 'undergraduate',
      year: '2025',
      excerpt: 'מדריך מקיף לכתיבת עבודה סמינריונית מצטיינת, כולל טיפים לבחירת נושא, מבנה העבודה, וכתיבה אקדמית.',
      excerptEn: 'A comprehensive guide to writing an excellent seminar paper, including tips for choosing a topic, paper structure, and academic writing.',
      excerptAr: 'دليل شامل لكتابة ورقة ندوة ممتازة، بما في ذلك نصائح لاختيار موضوع، وهيكل الورقة، والكتابة الأكاديمية.'
    },
    {
      id: 2,
      title: 'מקורות מידע אקדמיים מומלצים',
      titleEn: 'Recommended Academic Information Sources',
      titleAr: 'مصادر المعلومات الأكاديمية الموصى بها',
      category: 'resources',
      level: 'all',
      year: '2024',
      excerpt: 'רשימה של מקורות מידע אקדמיים מומלצים, כולל מאגרי מידע, כתבי עת, וספריות דיגיטליות.',
      excerptEn: 'A list of recommended academic information sources, including databases, journals, and digital libraries.',
      excerptAr: 'قائمة بمصادر المعلومات الأكاديمية الموصى بها، بما في ذلك قواعد البيانات والمجلات والمكتبات الرقمية.'
    },
    {
      id: 3,
      title: 'כתיבת תזה: מדריך שלב אחר שלב',
      titleEn: 'Writing a Thesis: Step-by-Step Guide',
      titleAr: 'كتابة أطروحة: دليل خطوة بخطوة',
      category: 'guides',
      level: 'masters',
      year: '2025',
      excerpt: 'מדריך מפורט לכתיבת תזה, כולל תכנון המחקר, איסוף נתונים, ניתוח, וכתיבת הפרקים השונים.',
      excerptEn: 'A detailed guide to writing a thesis, including research planning, data collection, analysis, and writing the various chapters.',
      excerptAr: 'دليل مفصل لكتابة أطروحة، بما في ذلك تخطيط البحث وجمع البيانات والتحليل وكتابة الفصول المختلفة.'
    }
  ];
  
  // Get article content based on current language
  const getArticleContent = (article) => {
    if (lng === 'en') {
      return {
        title: article.titleEn,
        excerpt: article.excerptEn
      };
    } else if (lng === 'ar') {
      return {
        title: article.titleAr,
        excerpt: article.excerptAr
      };
    }
    return {
      title: article.title,
      excerpt: article.excerpt
    };
  };
  
  // Filter articles based on search term and filters
  const filteredArticles = articles.filter(article => {
    const content = getArticleContent(article);
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          content.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || article.category === filters.category;
    const matchesLevel = filters.level === 'all' || article.level === filters.level;
    const matchesYear = filters.year === 'all' || article.year === filters.year;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesYear;
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        {t('article_search.title')}
      </h3>
      
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
            <FaSearch />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('article_search.search_placeholder')}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          />
        </div>
      </div>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaBook className="mr-2 rtl:ml-2 rtl:mr-0" />
            {t('article_search.filters.category')}
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          >
            <option value="all">{t('article_search.filters.all_categories')}</option>
            <option value="guides">{t('article_search.filters.guides')}</option>
            <option value="resources">{t('article_search.filters.resources')}</option>
            <option value="tips">{t('article_search.filters.tips')}</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="level" className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaGraduationCap className="mr-2 rtl:ml-2 rtl:mr-0" />
            {t('article_search.filters.level')}
          </label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          >
            <option value="all">{t('article_search.filters.all_levels')}</option>
            <option value="undergraduate">{t('article_search.filters.undergraduate')}</option>
            <option value="masters">{t('article_search.filters.masters')}</option>
            <option value="phd">{t('article_search.filters.phd')}</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="year" className="block text-gray-700 font-medium mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 rtl:ml-2 rtl:mr-0" />
            {t('article_search.filters.year')}
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          >
            <option value="all">{t('article_search.filters.all_years')}</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => {
            const content = getArticleContent(article);
            
            return (
              <div key={article.id} className="border-b border-gray-200 pb-6 last:border-0">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/${lng}/articles/${article.id}`} className="hover:text-primary-500 transition-colors">
                    {content.title}
                  </Link>
                </h4>
                <p className="text-gray-600 mb-3">
                  {content.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                    {t(`article_search.categories.${article.category}`)}
                  </span>
                  {article.level !== 'all' && (
                    <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                      {t(`article_search.levels.${article.level}`)}
                    </span>
                  )}
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {article.year}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <FaSearch className="mx-auto text-3xl text-gray-300 mb-3" />
            <p className="text-gray-500">
              {t('article_search.no_results')}
            </p>
          </div>
        )}
      </div>
      
      {filteredArticles.length > 0 && (
        <div className="mt-8 text-center">
          <Link 
            href={`/${lng}/articles`}
            className="inline-block bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 py-2 px-6 rounded-md transition-colors"
          >
            {t('article_search.view_all')}
          </Link>
        </div>
      )}
    </div>
  );
}
