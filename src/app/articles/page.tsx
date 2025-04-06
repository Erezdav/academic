import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import ArticleSearch from '@/components/ArticleSearch';
import AcademicSourceSearch from '@/components/AcademicSourceSearch';
import Footer from '@/components/Footer';
import AISearch from '@/components/AISearch'; // נצטרך ליצור רכיב זה

export const metadata: Metadata = {
  title: "ספריית מאמרים וחיפוש חכם - אקדמיק",
  description: "חיפוש ועיון במאמרים אקדמיים, מקורות מידע ובמאגר המאמרים שלנו בעזרת חיפוש מבוסס AI",
};

export default function ArticlesLibraryPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      <div className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              ספריית מאמרים וחיפוש חכם
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              חפש מאמרים אקדמיים, מקורות מידע או השתמש בחיפוש החכם המבוסס על בינה מלאכותית
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">חיפוש חכם מבוסס AI</h2>
              <AISearch />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">מאמרים מומלצים</h2>
              <ArticleSearch lng="he" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">מאגר מקורות אקדמיים</h2>
          <AcademicSourceSearch />
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">המאמרים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* פה יופיעו המאמרים שנכתבו בקובץ וורד */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">כיצד לכתוב עבודה סמינריונית מצטיינת</h3>
              <p className="text-gray-700 mb-4">
                מדריך מקיף לכתיבת עבודה סמינריונית מצטיינת, כולל טיפים לבחירת נושא, מבנה העבודה, וכתיבה אקדמית.
              </p>
              <a href="/articles/1" className="text-primary-500 hover:underline">קרא עוד</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">מקורות מידע אקדמיים מומלצים</h3>
              <p className="text-gray-700 mb-4">
                רשימה של מקורות מידע אקדמיים מומלצים, כולל מאגרי מידע, כתבי עת, וספריות דיגיטליות.
              </p>
              <a href="/articles/2" className="text-primary-500 hover:underline">קרא עוד</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">כתיבת תזה: מדריך שלב אחר שלב</h3>
              <p className="text-gray-700 mb-4">
                מדריך מפורט לכתיבת תזה, כולל תכנון המחקר, איסוף נתונים, ניתוח, וכתיבת הפרקים השונים.
              </p>
              <a href="/articles/3" className="text-primary-500 hover:underline">קרא עוד</a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/articles/upload" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
              העלאת מאמר חדש
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}