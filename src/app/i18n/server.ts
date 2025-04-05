import { NextRequest } from 'next/server';
import { languages, defaultLanguage } from './app/i18n/client';

export async function getTranslations(locale: string) {
  try {
    return (await import(`./app/i18n/locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for locale: ${locale}`, error);
    return {};
  }
}

export async function getServerTranslations(locale: string) {
  try {
    return (await import(`./app/i18n/locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for locale: ${locale}`, error);
    return {};
  }
}
