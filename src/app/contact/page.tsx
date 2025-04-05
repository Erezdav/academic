import { Metadata } from 'next';
import { getServerTranslations } from './i18n/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
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
      <Header />
      <Hero />
      <Services />
      <CallToAction />
      <Footer />
    </main>
  );
}