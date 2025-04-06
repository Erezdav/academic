'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// מקור התרגומים בעברית בלבד
const translations = {
  header: {
    logo: "אקדמיק",
    nav: {
      home: "דף הבית",
      services: "שירותים",
      writers: "הכותבים שלנו",
      process: "תהליך העבודה",
      about: "אודות",
      contact: "צור קשר"
    },
    cta: "הצעת מחיר"
  },
  hero: {
    title: "כתיבה אקדמית מקצועית",
    subtitle: "צוות הכותבים המומחים שלנו יסייע לך להצליח בלימודים האקדמיים",
    cta: "קבל הצעת מחיר",
    secondary_cta: "קרא עוד"
  },
  services: {
    title: "השירותים שלנו",
    subtitle: "אנו מציעים מגוון רחב של שירותי כתיבה אקדמית",
    items: [
      {
        title: "עבודות סמינריוניות",
        description: "עבודות מחקר מקיפות בכל תחומי הלימוד"
      },
      {
        title: "עבודות אקדמיות",
        description: "עבודות קצרות וארוכות לכל קורס ותחום"
      },
      {
        title: "תזות ודיסרטציות",
        description: "מחקרים מעמיקים לתארים מתקדמים"
      },
      {
        title: "סקירת ספרות",
        description: "סקירות מקיפות של ספרות אקדמית"
      },
      {
        title: "עריכה ותיקונים",
        description: "שיפור עבודות קיימות והתאמתן לדרישות"
      },
      {
        title: "עזרה בכתיבת מאמרים",
        description: "סיוע בכתיבת מאמרים לכתבי עת אקדמיים"
      }
    ],
    view_all: "לכל השירותים"
  },
  writers: {
    title: "הכותבים המומחים שלנו",
    subtitle: "צוות הכותבים שלנו כולל מומחים בעלי תארים מתקדמים במגוון תחומים",
    specialties: "תחומי התמחות",
    works: "עבודות שהושלמו",
    view_profile: "פרופיל מלא",
    view_all: "לכל הכותבים"
  },
  process: {
    title: "תהליך העבודה",
    subtitle: "תהליך עבודה פשוט ויעיל לקבלת עבודה אקדמית מושלמת",
    steps: [
      {
        title: "הזמנה",
        description: "מלא את טופס ההזמנה עם כל הפרטים הרלוונטיים"
      },
      {
        title: "תשלום",
        description: "בחר את שיטת התשלום המועדפת עליך"
      },
      {
        title: "כתיבה",
        description: "הכותב המתאים ביותר יתחיל לעבוד על העבודה שלך"
      },
      {
        title: "עדכונים",
        description: "תקבל עדכונים שוטפים על התקדמות העבודה"
      },
      {
        title: "משלוח",
        description: "העבודה המוכנה תישלח אליך לפני המועד האחרון"
      },
      {
        title: "תיקונים",
        description: "אם יש צורך בתיקונים, אנו נבצע אותם ללא תשלום נוסף"
      }
    ]
  },
  testimonials: {
    title: "לקוחות ממליצים",
    subtitle: "מה הלקוחות שלנו אומרים עלינו",
    via_whatsapp: "הודעת וואטסאפ",
    whatsapp_placeholder: "כאן יוצגו צילומי מסך של המלצות מוואטסאפ",
    view_more: "לעוד המלצות"
  },
  cta: {
    title: "מוכנים להתחיל?",
    subtitle: "צור קשר עוד היום ונעזור לך להצליח בלימודים האקדמיים",
    button: "קבל הצעת מחיר"
  },
  footer: {
    about: {
      title: "אודות",
      description: "אנו מספקים שירותי כתיבה אקדמית מקצועיים לסטודנטים בכל הרמות והתחומים"
    },
    links: {
      title: "קישורים מהירים",
      items: {
        home: "דף הבית",
        services: "שירותים",
        writers: "הכותבים שלנו",
        process: "תהליך העבודה",
        about: "אודות",
        contact: "צור קשר",
        blog: "בלוג",
        faq: "שאלות נפוצות",
        terms: "תנאי שימוש",
        privacy: "מדיניות פרטיות"
      }
    },
    contact: {
      title: "צור קשר",
      phone: "טלפון",
      email: "אימייל",
      address: "כתובת"
    },
    copyright: "כל הזכויות שמורות © 2025 אקדמיק"
  }
};

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
  return React.createElement(
    I18nContext.Provider,
    { value: { t, dir: 'rtl', language: 'he' } },
    children
  );
}

// הוק לשימוש בתרגום
export function useTranslation() {
  return useContext(I18nContext);
}

// פונקציה לצד השרת שמחזירה את אותו מידע
export async function getServerTranslations() {
  return {
    t,
    dir: 'rtl' as const,
    language: 'he'
  };
}