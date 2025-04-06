import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import Process from '@/components/Process';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "תהליך העבודה - אקדמיק",
  description: "תהליך פשוט ויעיל לכתיבת עבודות אקדמיות על ידי כותבים מקצועיים",
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      <div className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              תהליך העבודה שלנו
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              תהליך עבודה פשוט ויעיל לקבלת עבודה אקדמית מושלמת
            </p>
          </div>
        </div>
      </div>
      
      <Process />
      
      {/* מידע נוסף על התהליך */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              למה התהליך שלנו יעיל?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">תקשורת רציפה</h3>
                <p className="text-gray-700">
                  לאורך כל התהליך, אנו שומרים על תקשורת רציפה עם הלקוח. זה מאפשר לנו להתאים את העבודה במדויק לצרכים ולדרישות של הלקוח.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">התאמה אישית</h3>
                <p className="text-gray-700">
                  אנו מתאימים את הכותב המתאים ביותר לכל עבודה, בהתאם לתחום הלימוד, סוג העבודה, ודרישות ספציפיות. זה מבטיח עבודה באיכות הגבוהה ביותר.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">בקרת איכות</h3>
                <p className="text-gray-700">
                  כל עבודה עוברת תהליך בקרת איכות קפדני לפני המסירה ללקוח. אנו בודקים את העבודה מבחינת תוכן, מבנה, ציטוטים, וסגנון כתיבה.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">תיקונים ללא הגבלה</h3>
                <p className="text-gray-700">
                  אנו מציעים תיקונים ללא הגבלה עד שהלקוח מרוצה לחלוטין מהעבודה. הסיפוק של הלקוח הוא העדיפות העליונה שלנו.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CallToAction />
      <Footer />
    </main>
  );
}