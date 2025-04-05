'use client';

import { createContext, useContext, ReactNode } from 'react';

// Define the language
export const language = 'he';
export const dir = 'rtl';

// Define the shape of our i18n context
interface I18nContextType {
  language: string;
  t: (key: string) => string;
  dir: string;
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Create a provider component
export function I18nProvider({ 
  children, 
  translations
}: { 
  children: ReactNode;
  translations: Record<string, any>;
}) {
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
  
  return (
    <I18nContext.Provider value={{ language, t, dir }}>
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