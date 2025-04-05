import { Metadata } from 'next';
import { getServerTranslations } from '../i18n/server';
import Header from '@/components/Header';
import Services from '@/components/Services';
import PriceCalculator from '@/components/PriceCalculator';
import WriterSelector from '@/components/WriterSelector';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export async function generateMetadata({ params: { lng } }: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getServerTranslations(lng);
  
  return {
    title: t('meta.services.title'),
    description: t('meta.services.description'),
  };
}

export default async function ServicesPage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <main className="min-h-screen">
      <Header lng={lng} />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          {lng === 'he' ? 'השירותים שלנו' : lng === 'ar' ? 'خدماتنا' : 'Our Services'}
        </h1>
        <Services lng={lng} />
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {lng === 'he' ? 'חשב מחיר' : lng === 'ar' ? 'حساب السعر' : 'Price Calculator'}
          </h2>
          <PriceCalculator lng={lng} />
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {lng === 'he' ? 'הכותבים שלנו' : lng === 'ar' ? 'كتابنا' : 'Our Writers'}
          </h2>
          <WriterSelector lng={lng} />
        </div>
      </div>
      <CallToAction lng={lng} />
      <Footer lng={lng} />
    </main>
  );
}
