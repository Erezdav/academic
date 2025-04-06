// src/app/i18n/translations.ts
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
      cta: "הצעת מחיר",
      language_switcher: "שפה"
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
    meta: {
      home: {
        title: "אקדמיק - שירותי כתיבה אקדמית מקצועיים",
        description: "שירותי כתיבה אקדמית מקצועיים לסטודנטים בכל הרמות והתחומים"
      }
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
  
  // פונקציה לצד השרת שמחזירה את אותו מידע
  export async function getServerTranslations() {
    return {
      t,
      dir: 'rtl' as const,
      language: 'he'
    };
  }
  
  export default translations;