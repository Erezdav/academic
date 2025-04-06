'use client';

import { useTranslation } from '../app/i18n/client';
import Link from 'next/link';

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-md transition-colors text-lg"
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}