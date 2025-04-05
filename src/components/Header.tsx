'use client';

import Link from 'next/link';
import { useTranslation } from '../app/i18n/client';
import { useState } from 'react';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, language, dir } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${language}`} className="text-2xl font-bold text-primary-600">
            {t('header.logo')}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link href={`/${language}`} className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('header.nav.home')}
            </Link>
            <Link href={`/${language}/services`} className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('header.nav.services')}
            </Link>
            <Link href={`/${language}/writers`} className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('header.nav.writers')}
            </Link>
            <Link href={`/${language}/process`} className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('header.nav.process')}
            </Link>
            <Link href={`/${language}/contact`} className="text-gray-700 hover:text-primary-500 transition-colors">
              {t('header.nav.contact')}
            </Link>
          </nav>

          {/* CTA and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <Link 
              href={`/${language}/contact`} 
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t('header.cta')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href={`/${language}`} 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.home')}
              </Link>
              <Link 
                href={`/${language}/services`} 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.services')}
              </Link>
              <Link 
                href={`/${language}/writers`} 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.writers')}
              </Link>
              <Link 
                href={`/${language}/process`} 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.process')}
              </Link>
              <Link 
                href={`/${language}/contact`} 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.contact')}
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <LanguageSwitcher />
                <Link 
                  href={`/${language}/contact`} 
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.cta')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </header>
  );
}
