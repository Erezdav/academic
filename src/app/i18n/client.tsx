'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Define supported languages
export const languages = ['he', 'en', 'ar'];
export const defaultLanguage = 'he';

// Define the shape of our i18n context
interface I18nContextType {
  language: string;
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  dir: string;
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Create a provider component
export function I18nProvider({ 
  children, 
  initialLanguage = defaultLanguage,
  translations
}: { 
  children: ReactNode;
  initialLanguage: string;
  translations: Record<string, any>;
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const router = useRouter();
  const pathname = usePathname();
  
  // Get text based on key (using dot notation for nested objects)
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  // Change language and redirect to the same page in the new language
  const changeLanguage = (lang: string) => {
    if (!languages.includes(lang)) return;
    
    setLanguage(lang);
    
    // Get the current path segments
    const segments = pathname.split('/');
    
    // Replace the language segment (first segment after empty string)
    if (segments.length > 1) {
      segments[1] = lang;
      const newPath = segments.join('/');
      router.push(newPath);
    }
  };
  
  // Determine text direction based on language
  const dir = language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
  
  return (
    <I18nContext.Provider value={{ language, t, changeLanguage, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use the i18n context
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
