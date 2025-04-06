import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import Hero from '@/components/hero-component';
import Services from '@/components/Services';
import Writers from '@/components/Writers';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "אקדמיק - שירותי כתיבה אקדמית מקצועיים",
  description: "שירותי כתיבה אקדמית מקצועיים לסטודנטים בכל הרמות והתחומים",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Services />
      <Writers />
      <Process />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}