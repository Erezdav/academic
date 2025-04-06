'use client';

import { useTranslation } from '@/app/i18n/client';
import { FaGraduationCap, FaBook, FaFileAlt, FaSearch, FaEdit, FaNewspaper } from 'react-icons/fa';
import Link from 'next/link';

export default function Services() {
  const { t } = useTranslation();

  // אייקונים של השירותים
  const serviceIcons = [
    { key: 0, icon: <FaGraduationCap size={36} /> },
    { key: 1, icon: <FaFileAlt size={36} /> },
    { key: 2, icon: <FaBook size={36} /> },
    { key: 3, icon: <FaSearch size={36} /> },
    { key: 4, icon: <FaEdit size={36} /> },
    { key: 5, icon: <FaNewspaper size={36} /> },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-heading">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col items-center text-center"
              >
                <div className="text-primary-500 mb-4">
                  {serviceIcons[index].icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {t(`services.items.${index}.title`)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t(`services.items.${index}.description`)}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={`/services#${index}`}
                    className="text-primary-500 hover:text-primary-700 font-medium transition-colors"
                  >
                    ← {t('services.view_all')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}