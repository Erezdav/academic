'use client';

import { useTranslation } from '../app/i18n/client';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { t, language, dir } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.about.title')}</h3>
            <p className="text-gray-400 mb-4">{t('footer.about.description')}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/services`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/writers`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.writers')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/process`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.process')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${language}/blog`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/faq`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/terms`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${language}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.links.items.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <span className="text-gray-400">+972 50 123 4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <span className="text-gray-400">info@academic-writing.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <span className="text-gray-400">Tel Aviv, Israel</span>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="text-primary-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
