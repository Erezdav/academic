'use client';

import { useTranslation } from '../app/i18n/client';

export default function Testimonials() {
  const { t } = useTranslation();

  // נתוני המלצות לדוגמה - בגרסה אמיתית, אלה יגיעו מ-API או מסד נתונים
  const testimonials = [
    {
      id: 1,
      name: 'רונית ל.',
      text: 'קיבלתי עבודה סמינריונית מעולה שעזרה לי לסיים את התואר בהצטיינות. תודה רבה!',
      university: 'אוניברסיטת תל אביב'
    },
    {
      id: 2,
      name: 'אמיר כ.',
      text: 'שירות מקצועי ואמין. העבודה נכתבה ברמה גבוהה וקיבלתי ציון מעולה. ממליץ בחום!',
      university: 'האוניברסיטה העברית'
    },
    {
      id: 3,
      name: 'מיכל ש.',
      text: 'הזמנתי עבודת תזה והתוצאה הייתה מעבר לציפיות. המחקר היה מעמיק והכתיבה מצוינת.',
      university: 'אוניברסיטת בן גוריון'
    }
  ];

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
          {testimonials.map((testimonial) => (            
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
                      <span className="text-primary-600 font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="mr-3">
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.university}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {t('testimonials.via_whatsapp')}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg rounded-tr-none border-r-4 border-green-500">
                  <p className="text-gray-700">{testimonial.text}</p>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  {t('testimonials.whatsapp_placeholder')}
                </div>
              </div>
            </div>
          ))}
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