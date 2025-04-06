'use client';

import { useTranslation } from '@/app/i18n/client';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

export default function ContactForm() {
  const { t, language, dir } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, this would send the form data to a server
    // For now, we'll simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: language === 'en' 
        ? 'Thank you for your message! We will get back to you soon.' 
        : language === 'ar'
        ? 'شكرا لرسالتك! سنرد عليك قريبا.'
        : 'תודה על פנייתך! נחזור אליך בהקדם.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
      {formStatus.submitted && formStatus.success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          {formStatus.message}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            {t('contact.form.name')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
              <FaUser />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir={dir}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            {t('contact.form.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
              <FaEnvelope />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir="ltr"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            {t('contact.form.phone')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
              <FaPhone />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir="ltr"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            {t('contact.form.subject')}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            {t('contact.form.message')}
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto text-gray-500">
              <FaComments />
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir={dir}
            ></textarea>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          {t('contact.form.submit')}
        </button>
      </form>
    </div>
  );
}
