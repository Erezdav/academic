// src/app/i18n/client.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import translations from './translations';

// פונקציית תרגום פשוטה
export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // החזר את המפתח אם התרגום לא נמצא
    }
  }
  
  return typeof value === 'string' ? value : key;
};

// הגדר קונטקסט לתרגומים
interface I18nContextType {
  t: (key: string) => string;
  dir: 'rtl';
  language: string;
}

const I18nContext = createContext<I18nContextType>({
  t,
  dir: 'rtl',
  language: 'he'
});

// ספק תרגום
export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ t, dir: 'rtl', language: 'he' }}>
      {children}
    </I18nContext.Provider>
  );
}

// הוק לשימוש בתרגום
export function useTranslation() {
  return useContext(I18nContext);
}