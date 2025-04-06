import { Metadata } from 'next';
import SiteHeader from '@/components/siteHeader';
import Hero from '@/components/hero-component';
import ContactForm from '@/components/ContactForm';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "צור קשר - אקדמיק",
  description: "צור קשר עם צוות הכותבים המקצועיים שלנו לקבלת הצעת מחיר או לכל שאלה",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">צור קשר</h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          מלא את הטופס ונחזור אליך בהקדם
        </p>
        
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
      <CallToAction />
      <Footer />
    </main>
  );
}