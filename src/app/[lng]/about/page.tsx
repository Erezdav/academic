import { Metadata } from 'next';
import { getServerTranslations } from '../../i18n/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export async function generateMetadata({ params: { lng } }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getServerTranslations(lng);
  
  return {
    title: t('meta.about.title'),
    description: t('meta.about.description'),
  };
}

export default async function AboutPage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main className="min-h-screen">
      <Header lng={lng} />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          {lng === 'he' ? 'אודות' : lng === 'ar' ? 'حول' : 'About'}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">
              {lng === 'he' ? 'מי אנחנו' : lng === 'ar' ? 'من نحن' : 'Who We Are'}
            </h2>
            
            <div className="prose max-w-none">
              {lng === 'he' ? (
                <>
                  <p className="mb-4">אנו צוות של כותבים אקדמיים מקצועיים עם ניסיון רב בכתיבת עבודות אקדמיות ברמה גבוהה. המומחיות שלנו מקיפה מגוון רחב של תחומי לימוד, כולל מדעי החברה, מדעי הרוח, משפטים, כלכלה, מנהל עסקים ועוד.</p>
                  <p className="mb-4">המטרה שלנו היא לספק לסטודנטים וחוקרים את התמיכה האקדמית הטובה ביותר האפשרית, עם דגש על מקוריות, איכות ודיוק אקדמי.</p>
                </>
              ) : lng === 'ar' ? (
                <>
                  <p className="mb-4">نحن فريق من الكتاب الأكاديميين المحترفين ذوي الخبرة الواسعة في كتابة الأعمال الأكاديمية عالية المستوى. تغطي خبرتنا مجموعة واسعة من مجالات الدراسة، بما في ذلك العلوم الاجتماعية، والعلوم الإنسانية، والقانون، والاقتصاد، وإدارة الأعمال، وغيرها.</p>
                  <p className="mb-4">هدفنا هو تزويد الطلاب والباحثين بأفضل دعم أكاديمي ممكن، مع التركيز على الأصالة والجودة والدقة الأكاديمية.</p>
                </>
              ) : (
                <>
                  <p className="mb-4">We are a team of professional academic writers with extensive experience in writing high-quality academic papers. Our expertise covers a wide range of study fields, including social sciences, humanities, law, economics, business administration, and more.</p>
                  <p className="mb-4">Our goal is to provide students and researchers with the best possible academic support, with an emphasis on originality, quality, and academic accuracy.</p>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">
              {lng === 'he' ? 'הערכים שלנו' : lng === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            
            <div className="prose max-w-none">
              {lng === 'he' ? (
                <>
                  <p className="mb-4">אנו מחויבים לערכים הבאים בכל עבודה שאנו מבצעים:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2"><strong>מקוריות:</strong> כל עבודה נכתבת מאפס ועוברת בדיקת פלגיאט קפדנית.</li>
                    <li className="mb-2"><strong>איכות:</strong> אנו מקפידים על סטנדרטים אקדמיים גבוהים בכל עבודה.</li>
                    <li className="mb-2"><strong>דיוק:</strong> המחקר שלנו מבוסס על מקורות אמינים ועדכניים.</li>
                    <li className="mb-2"><strong>סודיות:</strong> אנו מחויבים לשמירה על פרטיות הלקוחות שלנו.</li>
                    <li className="mb-2"><strong>עמידה בזמנים:</strong> אנו מכבדים את לוחות הזמנים ומבטיחים משלוח בזמן.</li>
                  </ul>
                </>
              ) : lng === 'ar' ? (
                <>
                  <p className="mb-4">نحن ملتزمون بالقيم التالية في كل عمل نقوم به:</p>
                  <ul className="list-disc pr-6 mb-4">
                    <li className="mb-2"><strong>الأصالة:</strong> يتم كتابة كل عمل من الصفر ويخضع لفحص دقيق للانتحال.</li>
                    <li className="mb-2"><strong>الجودة:</strong> نحن نلتزم بمعايير أكاديمية عالية في كل عمل.</li>
                    <li className="mb-2"><strong>الدقة:</strong> يعتمد بحثنا على مصادر موثوقة وحديثة.</li>
                    <li className="mb-2"><strong>السرية:</strong> نحن ملتزمون بالحفاظ على خصوصية عملائنا.</li>
                    <li className="mb-2"><strong>الالتزام بالمواعيد:</strong> نحن نحترم الجداول الزمنية ونضمن التسليم في الوقت المحدد.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">We are committed to the following values in all the work we do:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2"><strong>Originality:</strong> Every paper is written from scratch and undergoes rigorous plagiarism checking.</li>
                    <li className="mb-2"><strong>Quality:</strong> We adhere to high academic standards in every paper.</li>
                    <li className="mb-2"><strong>Accuracy:</strong> Our research is based on reliable and up-to-date sources.</li>
                    <li className="mb-2"><strong>Confidentiality:</strong> We are committed to maintaining our clients' privacy.</li>
                    <li className="mb-2"><strong>Timeliness:</strong> We respect deadlines and ensure on-time delivery.</li>
                  </ul>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">
              {lng === 'he' ? 'התהליך שלנו' : lng === 'ar' ? 'عمليتنا' : 'Our Process'}
            </h2>
            
            <div className="prose max-w-none">
              {lng === 'he' ? (
                <>
                  <p className="mb-4">התהליך שלנו פשוט ושקוף:</p>
                  <ol className="list-decimal pl-6 mb-4">
                    <li className="mb-2"><strong>הזמנה:</strong> מלא את טופס ההזמנה עם כל הפרטים הרלוונטיים.</li>
                    <li className="mb-2"><strong>תשלום:</strong> בחר את שיטת התשלום המועדפת עליך.</li>
                    <li className="mb-2"><strong>כתיבה:</strong> הכותב המתאים ביותר יתחיל לעבוד על העבודה שלך.</li>
                    <li className="mb-2"><strong>עדכונים:</strong> תקבל עדכונים שוטפים על התקדמות העבודה.</li>
                    <li className="mb-2"><strong>משלוח:</strong> העבודה המוכנה תישלח אליך לפני המועד האחרון.</li>
                    <li className="mb-2"><strong>תיקונים:</strong> אם יש צורך בתיקונים, אנו נבצע אותם ללא תשלום נוסף.</li>
                  </ol>
                </>
              ) : lng === 'ar' ? (
                <>
                  <p className="mb-4">عمليتنا بسيطة وشفافة:</p>
                  <ol className="list-decimal pr-6 mb-4">
                    <li className="mb-2"><strong>الطلب:</strong> املأ نموذج الطلب بجميع التفاصيل ذات الصلة.</li>
                    <li className="mb-2"><strong>الدفع:</strong> اختر طريقة الدفع المفضلة لديك.</li>
                    <li className="mb-2"><strong>الكتابة:</strong> سيبدأ الكاتب الأنسب العمل على ورقتك.</li>
                    <li className="mb-2"><strong>التحديثات:</strong> ستتلقى تحديثات منتظمة حول تقدم العمل.</li>
                    <li className="mb-2"><strong>التسليم:</strong> سيتم إرسال الورقة النهائية إليك قبل الموعد النهائي.</li>
                    <li className="mb-2"><strong>التعديلات:</strong> إذا كانت هناك حاجة لإجراء تعديلات، فسنقوم بها دون أي تكلفة إضافية.</li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="mb-4">Our process is simple and transparent:</p>
                  <ol className="list-decimal pl-6 mb-4">
                    <li className="mb-2"><strong>Order:</strong> Fill out the order form with all relevant details.</li>
                    <li className="mb-2"><strong>Payment:</strong> Choose your preferred payment method.</li>
                    <li className="mb-2"><strong>Writing:</strong> The most suitable writer will start working on your paper.</li>
                    <li className="mb-2"><strong>Updates:</strong> You will receive regular updates on the progress.</li>
                    <li className="mb-2"><strong>Delivery:</strong> The completed paper will be sent to you before the deadline.</li>
                    <li className="mb-2"><strong>Revisions:</strong> If revisions are needed, we will make them at no additional cost.</li>
                  </ol>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CallToAction lng={lng} />
      <Footer lng={lng} />
    </main>
  );
}
