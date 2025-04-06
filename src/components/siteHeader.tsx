'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaWhatsapp, FaCalculator } from 'react-icons/fa';

// הגדרת טקסטים ישירות בקומפוננט ללא תלות במערכת i18n מורכבת
const headerText = {
  logo: "אקדמיק",
  nav: {
    home: "דף הבית",
    services: "שירותים",
    writers: "הכותבים שלנו",
    process: "תהליך העבודה",
    calculator: "מחשבון מחירים",
    contact: "צור קשר"
  },
  cta: "הצעת מחיר"
};

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            {headerText.logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-primary-500 transition-colors">
              {headerText.nav.home}
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-500 transition-colors">
              {headerText.nav.services}
            </Link>
            <Link href="/writers" className="text-gray-700 hover:text-primary-500 transition-colors">
              {headerText.nav.writers}
            </Link>
            <Link href="/process" className="text-gray-700 hover:text-primary-500 transition-colors">
              {headerText.nav.process}
            </Link>
            <Link href="/calculator" className="text-gray-700 hover:text-primary-500 transition-colors flex items-center">
              <FaCalculator className="ml-1" />
              {headerText.nav.calculator}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-500 transition-colors">
              {headerText.nav.contact}
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link 
              href="/contact" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {headerText.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerText.nav.home}
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerText.nav.services}
              </Link>
              <Link 
                href="/writers" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerText.nav.writers}
              </Link>
              <Link 
                href="/process" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerText.nav.process}
              </Link>
              <Link 
                href="/calculator" 
                className="text-gray-700 hover:text-primary-500 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaCalculator className="ml-1" />
                {headerText.nav.calculator}
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerText.nav.contact}
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  href="/contact" 
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {headerText.cta}
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
        aria-label="צור קשר בוואטסאפ"
      >
        <FaWhatsapp size={24} />
      </a>
    </header>
  );
}