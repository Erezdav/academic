'use client';

import { useTranslation } from '../app/i18n/client';
import Image from 'next/image';
import Link from 'next/link';

export default function Writers() {
  const { t, language, dir } = useTranslation();

  // Mock writer data - in a real application, this would come from an API or database
  const writers = [
    {
      id: 1,
      name: 'ד"ר יעל כהן',
      nameEn: 'Dr. Yael Cohen',
      nameAr: 'د. ياعيل كوهين',
      specialties: ['חינוך', 'פסיכולוגיה', 'סוציולוגיה'],
      specialtiesEn: ['Education', 'Psychology', 'Sociology'],
      specialtiesAr: ['التعليم', 'علم النفس', 'علم الاجتماع'],
      completedWorks: 124,
    },
    {
      id: 2,
      name: 'פרופ\' דוד לוי',
      nameEn: 'Prof. David Levi',
      nameAr: 'أ.د. دافيد ليفي',
      specialties: ['כלכלה', 'מנהל עסקים', 'מימון'],
      specialtiesEn: ['Economics', 'Business Administration', 'Finance'],
      specialtiesAr: ['الاقتصاد', 'إدارة الأعمال', 'التمويل'],
      completedWorks: 87,
    },
    {
      id: 3,
      name: 'ד"ר מיכל אברהם',
      nameEn: 'Dr. Michal Avraham',
      nameAr: 'د. ميخال أفراهام',
      specialties: ['משפטים', 'מדעי המדינה', 'היסטוריה'],
      specialtiesEn: ['Law', 'Political Science', 'History'],
      specialtiesAr: ['القانون', 'العلوم السياسية', 'التاريخ'],
      completedWorks: 156,
    }
  ];

  // Get writer name and specialties based on current language
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-heading">
            {t('writers.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('writers.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {writers.map((writer) => (
            <div 
              key={writer.id} 
              className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
            >
              <div className="h-48 bg-primary-100 relative">
                {/* Placeholder for writer illustration in the style of Tal Peres */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-20 h-20 mx-auto text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <p className="mt-2 text-primary-500 text-sm">
                      {dir === 'rtl' ? 'איור בסגנון טל פרס יופיע כאן' : 'Illustration in Tal Peres style will appear here'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {getWriterName(writer)}
                </h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t('writers.specialties')}:
                  </h4>
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
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t('writers.works')}:
                  </h4>
                  <p className="text-gray-900 font-bold">{writer.completedWorks}+</p>
                </div>
                
                <Link 
                  href={`/${language}/writers/${writer.id}`}
                  className="block text-center bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {t('writers.view_profile')}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href={`/${language}/writers`}
            className="inline-block bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 py-2 px-6 rounded-md transition-colors"
          >
            {t('writers.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
