import { Metadata } from 'next';
import { getServerTranslations } from '../i18n/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Writers from '@/components/Writers';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export async function generateMetadata({ params: { lng } }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getServerTranslations(lng);
  
  return {
    title: t('meta.home.title'),
    description: t('meta.home.description'),
  };
}

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main className="min-h-screen">
      <Header lng={lng} />
      <Hero lng={lng} />
      <Services lng={lng} />
      <Writers lng={lng} />
      <Process lng={lng} />
      <Testimonials lng={lng} />
      <CallToAction lng={lng} />
      <Footer lng={lng} />
    </main>
  );
}
