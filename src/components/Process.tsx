'use client';

import { useTranslation } from '@/app/i18n/client' '@/app/i18n/client' '../app/i18n/client';
import { FaClipboardCheck, FaComments, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

export default function Process() {
  const { t, language, dir } = useTranslation();

  // Process steps
  const steps = [
    {
      icon: <FaClipboardCheck size={40} />,
      title: 'שלב 1: הגשת בקשה',
      titleEn: 'Step 1: Submit Request',
      titleAr: 'الخطوة 1: تقديم الطلب',
      description: 'מלא את טופס הבקשה עם כל הפרטים והדרישות של העבודה האקדמית שלך',
      descriptionEn: 'Fill out the request form with all the details and requirements of your academic paper',
      descriptionAr: 'املأ نموذج الطلب بجميع التفاصيل ومتطلبات ورقتك الأكاديمية'
    },
    {
      icon: <FaComments size={40} />,
      title: 'שלב 2: התייעצות',
      titleEn: 'Step 2: Consultation',
      titleAr: 'الخطوة 2: الاستشارة',
      description: 'נציג שלנו יצור איתך קשר לדיון בפרטים ולהתאמת הכותב המתאים ביותר',
      descriptionEn: 'Our representative will contact you to discuss details and match the most suitable writer',
      descriptionAr: 'سيتصل بك ممثلنا لمناقشة التفاصيل ومطابقة الكاتب الأنسب'
    },
    {
      icon: <FaFileAlt size={40} />,
      title: 'שלב 3: כתיבה ועדכונים',
      titleEn: 'Step 3: Writing & Updates',
      titleAr: 'الخطوة 3: الكتابة والتحديثات',
      description: 'הכותב יתחיל בעבודה ויעדכן אותך באופן שוטף על ההתקדמות',
      descriptionEn: 'The writer will begin working and update you regularly on progress',
      descriptionAr: 'سيبدأ الكاتب العمل ويطلعك بانتظام على التقدم المحرز'
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: 'שלב 4: מסירה וביקורת',
      titleEn: 'Step 4: Delivery & Review',
      titleAr: 'الخطوة 4: التسليم والمراجعة',
      description: 'קבל את העבודה המוכנה ובקש תיקונים אם נדרש, עד שתהיה מרוצה לחלוטין',
      descriptionEn: 'Receive the completed work and request revisions if needed, until you are completely satisfied',
      descriptionAr: 'استلم العمل المكتمل واطلب المراجعات إذا لزم الأمر، حتى تكون راضيًا تمامًا'
    }
  ];

  // Get step content based on current language
  const getStepTitle = (step) => {
    if (language === 'en') return step.titleEn;
    if (language === 'ar') return step.titleAr;
    return step.title;
  };

  const getStepDescription = (step) => {
    if (language === 'en') return step.descriptionEn;
    if (language === 'ar') return step.descriptionAr;
    return step.description;
  };

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
                          {getStepTitle(step)}
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        {getStepDescription(step)}
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
