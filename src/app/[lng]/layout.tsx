import { inter, heebo } from '../fonts';
import { getServerTranslations } from '../i18n/server';
import { I18nProvider } from '../i18n/client';

export default async function RootLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const translations = await getServerTranslations(lng);
  
  return (
    <html lang={lng} dir={lng === 'he' || lng === 'ar' ? 'rtl' : 'ltr'} className={`${inter.variable} ${heebo.variable}`}>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <I18nProvider initialLanguage={lng} translations={translations}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
