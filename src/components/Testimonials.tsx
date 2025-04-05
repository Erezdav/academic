'use client';

import { useTranslation } from '../app/i18n/client';
import Image from 'next/image';

export default function Testimonials({ lng }) {
  const { t, dir } = useTranslation();

  // Mock testimonial data - in a real application, this would come from an API or database
  const testimonials = [
    {
      id: 1,
      name: 'רונית ל.',
      nameEn: 'Ronit L.',
      nameAr: 'رونيت ل.',
      text: 'קיבלתי עבודה סמינריונית מעולה שעזרה לי לסיים את התואר בהצטיינות. תודה רבה!',
      textEn: 'I received an excellent seminar paper that helped me complete my degree with honors. Thank you so much!',
      textAr: 'حصلت على ورقة ندوة ممتازة ساعدتني على إكمال درجتي بامتياز. شكرا جزيلا!',
      university: 'אוניברסיטת תל אביב',
      universityEn: 'Tel Aviv University',
      universityAr: 'جامعة تل أبيب'
    },
    {
      id: 2,
      name: 'אמיר כ.',
      nameEn: 'Amir K.',
      nameAr: 'أمير ك.',
      text: 'שירות מקצועי ואמין. העבודה נכתבה ברמה גבוהה וקיבלתי ציון מעולה. ממליץ בחום!',
      textEn: 'Professional and reliable service. The paper was written at a high level and I received an excellent grade. Highly recommended!',
      textAr: 'خدمة مهنية وموثوقة. تمت كتابة الورقة بمستوى عالٍ وحصلت على درجة ممتازة. أوصي بشدة!',
      university: 'האוניברסיטה העברית',
      universityEn: 'Hebrew University',
      universityAr: 'الجامعة العبرية'
    },
    {
      id: 3,
      name: 'מיכל ש.',
      nameEn: 'Michal S.',
      nameAr: 'ميخال س.',
      text: 'הזמנתי עבודת תזה והתוצאה הייתה מעבר לציפיות. המחקר היה מעמיק והכתיבה מצוינת.',
      textEn: 'I ordered a thesis and the result was beyond expectations. The research was thorough and the writing was excellent.',
      textAr: 'طلبت أطروحة وكانت النتيجة تفوق التوقعات. كان البحث شاملاً والكتابة ممتازة.',
      university: 'אוניברסיטת בן גוריון',
      universityEn: 'Ben Gurion University',
      universityAr: 'جامعة بن غوريون'
    }
  ];

  // Get testimonial content based on current language
  const getTestimonialContent = (testimonial) => {
    if (lng === 'en') {
      return {
        name: testimonial.nameEn,
        text: testimonial.textEn,
        university: testimonial.universityEn
      };
    } else if (lng === 'ar') {
      return {
        name: testimonial.nameAr,
        text: testimonial.textAr,
        university: testimonial.universityAr
      };
    }
    return {
      name: testimonial.name,
      text: testimonial.text,
      university: testimonial.university
    };
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const content = getTestimonialContent(testimonial);
            
            return (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden animate-fade-in"
                style={{ animationDelay: `${testimonial.id * 0.1}s` }}
              >
                {/* WhatsApp style message */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">{content.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3 rtl:mr-3 rtl:ml-0">
                        <h3 className="text-lg font-semibold text-gray-900">{content.name}</h3>
                        <p className="text-sm text-gray-500">{content.university}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {t('testimonials.via_whatsapp')}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg rounded-tl-none border-l-4 border-green-500">
                    <p className="text-gray-700">{content.text}</p>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    {t('testimonials.whatsapp_placeholder')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <button className="inline-block bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 py-2 px-6 rounded-md transition-colors">
            {t('testimonials.view_more')}
          </button>
        </div>
      </div>
    </section>
  );
}
