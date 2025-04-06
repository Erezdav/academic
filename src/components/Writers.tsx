'use client';

import { useTranslation } from '../app/i18n/client';
import Link from 'next/link';

export default function Writers() {
  const { t } = useTranslation();

  // נתוני כותבים לדוגמה - בגרסה אמיתית, אלה יגיעו מ-API או מסד נתונים
  const writers = [
    {
      id: 1,
      name: 'ד"ר יעל כהן',
      specialties: ['חינוך', 'פסיכולוגיה', 'סוציולוגיה'],
      completedWorks: 124,
    },
    {
      id: 2,
      name: 'פרופ\' דוד לוי',
      specialties: ['כלכלה', 'מנהל עסקים', 'מימון'],
      completedWorks: 87,
    },
    {
      id: 3,
      name: 'ד"ר מיכל אברהם',
      specialties: ['משפטים', 'מדעי המדינה', 'היסטוריה'],
      completedWorks: 156,
    }
  ];

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
                      איור בסגנון טל פרס יופיע כאן
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {writer.name}
                </h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {t('writers.specialties')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {writer.specialties.map((specialty, index) => (
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
                  href={`/writers/${writer.id}`}
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
            href="/writers"
            className="inline-block bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 py-2 px-6 rounded-md transition-colors"
          >
            {t('writers.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}