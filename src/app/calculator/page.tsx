import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import PriceCalculator from '@/components/PriceCalculator';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "מחשבון מחירים - אקדמיק",
  description: "חשב מחיר לשירותי כתיבה אקדמית כולל עבודות סמינריוניות, תזות, דיסרטציות ועוד",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      <div className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              מחשבון מחירים
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              חשב מחיר לעבודה האקדמית שלך וקבל הצעת מחיר מיידית
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </div>
      
      <CallToAction />
      <Footer />
    </main>
  );
}