'use client';

import { useTranslation } from '@/app/i18n/client';
import { FaClipboardCheck, FaComments, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

export default function Process() {
  const { t, dir } = useTranslation();

  // צעדי התהליך - רק בעברית
  const steps = [
    {
      icon: <FaClipboardCheck size={40} />,
      title: 'שלב 1: הגשת בקשה',
      description: 'מלא את טופס הבקשה עם כל הפרטים והדרישות של העבודה האקדמית שלך'
    },
    {
      icon: <FaComments size={40} />,
      title: 'שלב 2: התייעצות',
      description: 'נציג שלנו יצור איתך קשר לדיון בפרטים ולהתאמת הכותב המתאים ביותר'
    },
    {
      icon: <FaFileAlt size={40} />,
      title: 'שלב 3: כתיבה ועדכונים',
      description: 'הכותב יתחיל בעבודה ויעדכן אותך באופן שוטף על ההתקדמות'
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: 'שלב 4: מסירה וביקורת',
      description: 'קבל את העבודה המוכנה ובקש תיקונים אם נדרש, עד שתהיה מרוצה לחלוטין'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-heading">
            {t('process.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Process timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot for desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full border-4 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 md:px-8">
                    <div className={`bg-white rounded-lg shadow-card p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="flex items-center mb-4">
                        <div className="text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty space for timeline alignment */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}