// מחק ייבוא של NextRequest אם לא נדרש
// import { NextRequest } from 'next/server';

// שנה את נתיב הייבוא
import { languages } from '../i18n/client';
// או, אם זה לא עובד, נסה:
// import { languages, defaultLanguage } from '@/app/i18n/client';

export async function getServerTranslations() {
  try {
    return (await import(`./locales/he/common.json`)).default;
  } catch (error) {
    console.error(`Could not load translations`, error);
    return {};
  }
}
