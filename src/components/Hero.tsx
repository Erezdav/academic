'use client';

import { useTranslation } from '../app/i18n/client';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ lng }) {
  const { t, dir } = useTranslation();

  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 ${dir === 'rtl' ? 'md:order-2' : 'md:order-1'} animate-slide-up`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${lng}/contact`}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                {t('hero.cta')}
              </Link>
              <Link 
                href={`/${lng}/services`}
                className="bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 font-bold py-3 px-6 rounded-md transition-colors"
              >
                {t('hero.secondary_cta')}
              </Link>
            </div>
          </div>
          
          <div className={`md:w-1/2 ${dir === 'rtl' ? 'md:order-1' : 'md:order-2'} mt-12 md:mt-0 animate-slide-up`} style={{ animationDelay: '0.2s' }}>
            <div className="relative h-80 md:h-96 w-full">
              {/* Placeholder for illustration in Tal Peres style */}
              <div className="absolute inset-0 flex items-center justify-center bg-primary-100 rounded-lg">
                <div className="text-center p-8">
                  <svg className="w-32 h-32 mx-auto text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                  </svg>
                  <p className="mt-4 text-primary-500 text-lg font-medium">
                    {dir === 'rtl' ? 'איור בסגנון טל פרס יופיע כאן' : 'Illustration in Tal Peres style will appear here'}
                  </p>
                  <p className="mt-2 text-primary-400 text-sm">
                    {dir === 'rtl' ? 'דמויות מסוגננות עם צבעים עזים' : 'Stylized characters with vibrant colors'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-secondary-200 opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
}
