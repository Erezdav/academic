import { Metadata } from 'next';
import { getServerTranslations } from '@/app/i18n';
import SiteHeader from '@/components/siteHeader';
import Hero from '@/components/hero-component';
import Services from '@/components/Services';
import Writers from '@/components/Writers';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  
  return {
    title: t('meta.home.title'),
    description: t('meta.home.description'),
  };
}

export default async function Home() {
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