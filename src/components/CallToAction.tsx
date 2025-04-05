'use client';

import { useTranslation } from '../app/i18n/client';
import Link from 'next/link';

export default function CallToAction() {
  const { t, language, dir } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          {t('cta.subtitle')}
        </p>
        <Link 
          href={`/${language}/contact`} 
          className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-md transition-colors font-bold text-lg"
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  );
}
