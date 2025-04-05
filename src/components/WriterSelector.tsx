'use client';

import { useTranslation } from '../app/i18n/client';
import { useState } from 'react';
import { FaUserGraduate, FaStar, FaCheck, FaFilter } from 'react-icons/fa';

export default function WriterSelector() {
  const { t, language, dir } = useTranslation();
  
  const [filters, setFilters] = useState({
    specialty: '',
    rating: 0,
    experience: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWriter, setSelectedWriter] = useState(null);
  
  // Mock writers data - in a real application, this would come from an API or database
  const writers = [
    {
      id: 1,
      name: 'ד"ר יעל כהן',
      nameEn: 'Dr. Yael Cohen',
      nameAr: 'د. ياعيل كوهين',
      specialties: ['חינוך', 'פסיכולוגיה', 'סוציולוגיה'],
      specialtiesEn: ['Education', 'Psychology', 'Sociology'],
      specialtiesAr: ['التعليم', 'علم النفس', 'علم الاجتماع'],
      experience: 8,
      completedWorks: 124,
      rating: 4.9,
      bio: 'ד"ר יעל כהן היא מרצה בכירה בתחום החינוך והפסיכולוגיה עם ניסיון של 8 שנים בכתיבה אקדמית. היא מתמחה בעבודות מחקר איכותניות וכמותיות.',
      bioEn: 'Dr. Yael Cohen is a senior lecturer in education and psychology with 8 years of experience in academic writing. She specializes in qualitative and quantitative research papers.',
      bioAr: 'د. ياعيل كوهين هي محاضرة كبيرة في التعليم وعلم النفس مع 8 سنوات من الخبرة في الكتابة الأكاديمية. تتخصص في أوراق البحث النوعية والكمية.'
    },
    {
      id: 2,
      name: 'פרופ\' דוד לוי',
      nameEn: 'Prof. David Levi',
      nameAr: 'أ.د. دافيد ليفي',
      specialties: ['כלכלה', 'מנהל עסקים', 'מימון'],
      specialtiesEn: ['Economics', 'Business Administration', 'Finance'],
      specialtiesAr: ['الاقتصاد', 'إدارة الأعمال', 'التمويل'],
      experience: 15,
      completedWorks: 87,
      rating: 4.8,
      bio: 'פרופ\' דוד לוי הוא מומחה בתחום הכלכלה ומנהל עסקים עם ניסיון של 15 שנים באקדמיה. הוא פרסם מאמרים רבים בכתבי עת מובילים.',
      bioEn: 'Prof. David Levi is an expert in economics and business administration with 15 years of academic experience. He has published numerous articles in leading journals.',
      bioAr: 'أ.د. دافيد ليفي هو خبير في الاقتصاد وإدارة الأعمال مع 15 عامًا من الخبرة الأكاديمية. نشر العديد من المقالات في المجلات الرائدة.'
    },
    {
      id: 3,
      name: 'ד"ר מיכל אברהם',
      nameEn: 'Dr. Michal Avraham',
      nameAr: 'د. ميخال أفراهام',
      specialties: ['משפטים', 'מדעי המדינה', 'היסטוריה'],
      specialtiesEn: ['Law', 'Political Science', 'History'],
      specialtiesAr: ['القانون', 'العلوم السياسية', 'التاريخ'],
      experience: 10,
      completedWorks: 156,
      rating: 4.7,
      bio: 'ד"ר מיכל אברהם היא מומחית למשפטים ומדעי המדינה עם תואר דוקטור מאוניברסיטת תל אביב. היא מתמחה בכתיבת עבודות מחקר וניתוח מדיניות.',
      bioEn: 'Dr. Michal Avraham is an expert in law and political science with a PhD from Tel Aviv University. She specializes in research papers and policy analysis.',
      bioAr: 'د. ميخال أفراهام هي خبيرة في القانون والعلوم السياسية مع درجة الدكتوراه من جامعة تل أبيب. تتخصص في أوراق البحث وتحليل السياسات.'
    },
    {
      id: 4,
      name: 'ד"ר אלון גולדשטיין',
      nameEn: 'Dr. Alon Goldstein',
      nameAr: 'د. ألون غولدشتاين',
      specialties: ['מדעי המחשב', 'הנדסה', 'מתמטיקה'],
      specialtiesEn: ['Computer Science', 'Engineering', 'Mathematics'],
      specialtiesAr: ['علوم الكمبيوتر', 'الهندسة', 'الرياضيات'],
      experience: 7,
      completedWorks: 92,
      rating: 4.9,
      bio: 'ד"ר אלון גולדשטיין הוא מומחה בתחום מדעי המחשב והנדסה עם ניסיון של 7 שנים בכתיבה אקדמית. הוא מתמחה בעבודות טכניות ומחקרים כמותיים.',
      bioEn: 'Dr. Alon Goldstein is an expert in computer science and engineering with 7 years of experience in academic writing. He specializes in technical papers and quantitative research.',
      bioAr: 'د. ألون غولدشتاين هو خبير في علوم الكمبيوتر والهندسة مع 7 سنوات من الخبرة في الكتابة الأكاديمية. يتخصص في الأوراق التقنية والبحوث الكمية.'
    }
  ];
  
  // Get writer content based on current language
  const getWriterName = (writer) => {
    if (language === 'en') return writer.nameEn;
    if (language === 'ar') return writer.nameAr;
    return writer.name;
  };

  const getWriterSpecialties = (writer) => {
    if (language === 'en') return writer.specialtiesEn;
    if (language === 'ar') return writer.specialtiesAr;
    return writer.specialties;
  };
  
  const getWriterBio = (writer) => {
    if (language === 'en') return writer.bioEn;
    if (language === 'ar') return writer.bioAr;
    return writer.bio;
  };
  
  // Filter writers based on selected filters
  const filteredWriters = writers.filter(writer => {
    const matchesSpecialty = !filters.specialty || 
      getWriterSpecialties(writer).includes(filters.specialty);
    
    const matchesRating = writer.rating >= filters.rating;
    
    const matchesExperience = writer.experience >= filters.experience;
    
    return matchesSpecialty && matchesRating && matchesExperience;
  });
  
  // Handle writer selection
  const handleSelectWriter = (writer) => {
    setSelectedWriter(writer);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      specialty: '',
      rating: 0,
      experience: 0
    });
  };
  
  // All unique specialties from writers
  const allSpecialties = Array.from(new Set(
    writers.flatMap(writer => 
      language === 'en' ? writer.specialtiesEn : 
      language === 'ar' ? writer.specialtiesAr : 
      writer.specialties
    )
  ));
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        {t('writer_selector.title')}
      </h3>
      
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
        >
          <FaFilter className="mr-2 rtl:ml-2 rtl:mr-0" />
          {showFilters ? t('writer_selector.hide_filters') : t('writer_selector.show_filters')}
        </button>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">
                {t('writer_selector.filters')}
              </h4>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm text-primary-500 hover:text-primary-700"
              >
                {t('writer_selector.reset_filters')}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="specialty" className="block text-gray-700 text-sm font-medium mb-1">
                  {t('writer_selector.specialty')}
                </label>
                <select
                  id="specialty"
                  value={filters.specialty}
                  onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  dir={dir}
                >
                  <option value="">{t('writer_selector.all_specialties')}</option>
                  {allSpecialties.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-gray-700 text-sm font-medium mb-1">
                  {t('writer_selector.min_rating')}
                </label>
                <select
                  id="rating"
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  dir={dir}
                >
                  <option value="0">{t('writer_selector.any_rating')}</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.7">4.7+</option>
                  <option value="4.9">4.9+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-gray-700 text-sm font-medium mb-1">
                  {t('writer_selector.min_experience')}
                </label>
                <select
                  id="experience"
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: parseInt(e.target.value)})}
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  dir={dir}
                >
                  <option value="0">{t('writer_selector.any_experience')}</option>
                  <option value="5">5+ {t('writer_selector.years')}</option>
                  <option value="10">10+ {t('writer_selector.years')}</option>
                  <option value="15">15+ {t('writer_selector.years')}</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Writers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWriters.map((writer) => (
          <div 
            key={writer.id} 
            className={`bg-white rounded-lg border transition-colors ${
              selectedWriter?.id === writer.id 
                ? 'border-primary-500 ring-2 ring-primary-100' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                  <FaUserGraduate size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {getWriterName(writer)}
                  </h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(writer.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">{writer.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-600">
                      {writer.experience} {t('writer_selector.years_experience')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-1">
                  {t('writer_selector.specialties')}:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {getWriterSpecialties(writer).map((specialty, index) => (
                    <span 
                      key={index} 
                      className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-gray-600 text-sm">
                  {getWriterBio(writer)}
                </p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{writer.completedWorks}+</span> {t('writer_selector.completed_works')}
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectWriter(writer)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedWriter?.id === writer.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-primary-500 text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {selectedWriter?.id === writer.id ? (
                    <span className="flex items-center">
                      <FaCheck className="mr-1 rtl:ml-1 rtl:mr-0" />
                      {t('writer_selector.selected')}
                    </span>
                  ) : (
                    t('writer_selector.select')
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWriters.length === 0 && (
        <div className="text-center py-8">
          <FaUserGraduate className="mx-auto text-gray-300 text-4xl mb-3" />
          <h4 className="text-lg font-medium text-gray-700 mb-1">
            {t('writer_selector.no_writers')}
          </h4>
          <p className="text-gray-500">
            {t('writer_selector.try_different')}
          </p>
        </div>
      )}
      
      {selectedWriter && (
        <div className="mt-8">
          <button
            type="button"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
            onClick={() => {
              // In a real application, this would proceed to the order form with the selected writer
              window.location.href = `/${language}/contact?writer=${selectedWriter.id}`;
            }}
          >
            {t('writer_selector.continue_with_writer', { name: getWriterName(selectedWriter) })}
          </button>
        </div>
      )}
    </div>
  );
}
