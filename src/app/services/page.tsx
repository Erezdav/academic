import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import Hero from '@/components/hero-component';
import Services from '@/components/Services';
import PriceCalculator from '@/components/PriceCalculator';
import Process from '@/components/Process';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "השירותים שלנו - אקדמיק",
  description: "מגוון שירותי כתיבה אקדמית מקצועיים, כולל עבודות סמינריוניות, תזות, דיסרטציות, סקירות ספרות ועוד",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Services />
      
      {/* מחשבון מחירים */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </section>
      
      <Process />
      <CallToAction />
      <Footer />
    </main>
  );
}