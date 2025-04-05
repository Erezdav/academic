import type { NextPage } from 'next';
import Head from 'next/head';
import ImprovedAcademicSearch from '../components/ImprovedAcademicSearch';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>חיפוש מקורות אקדמיים</title>
        <meta name="description" content="מנוע חיפוש חכם למקורות אקדמיים" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary-700">מנוע חיפוש חכם למקורות אקדמיים</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            חפש מקורות אקדמיים רלוונטיים למחקר שלך. סנן לפי סוג מקור, תחום אקדמי, שפה, זמינות ועוד.
            המנוע החכם שלנו מבין את נושא המחקר שלך ומציע את המקורות המתאימים ביותר.
          </p>
          
          <ImprovedAcademicSearch />
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} מנוע חיפוש מקורות אקדמיים</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
