'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FaGraduationCap, FaClock, FaFileAlt, FaMoneyBillWave, FaPercent } from 'react-icons/fa';

export default function PriceCalculator({ lng }) {
  const { t, language, dir } = useTranslation();
  
  const [formData, setFormData] = useState({
    documentType: 'essay',
    academicLevel: 'undergraduate',
    deadline: '7',
    pages: 1,
    paperType: 'theoretical' // Default to theoretical for seminar papers
  });
  
  const [price, setPrice] = useState(0);
  const [vatRate, setVatRate] = useState(18); // VAT rate as a percentage
  const [priceWithoutVat, setPriceWithoutVat] = useState(0);
  
  // Base prices per page (in NIS)
  const basePrices = {
    essay: {
      highschool: 120,
      undergraduate: 150,
      masters: 200,
      phd: 250
    },
    research: {
      highschool: 150,
      undergraduate: 180,
      masters: 230,
      phd: 280
    },
    thesis: {
      highschool: 180,
      undergraduate: 220,
      masters: 280,
      phd: 350
    },
    dissertation: {
      undergraduate: 250,
      masters: 300,
      phd: 400
    },
    seminar_theoretical: {
      undergraduate: 200,
      masters: 250,
      phd: 320
    },
    seminar_research: {
      undergraduate: 250,
      masters: 320,
      phd: 400
    }
  };
  
  // Deadline multipliers
  const deadlineMultipliers = {
    '1': 2.0,  // 1 day
    '2': 1.8,  // 2 days
    '3': 1.6,  // 3 days
    '5': 1.4,  // 5 days
    '7': 1.2,  // 7 days
    '14': 1.0  // 14 days
  };
  
  // Calculate price whenever form data changes
  useEffect(() => {
    calculatePrice();
  }, [formData, vatRate]);
  
  const calculatePrice = () => {
    const { documentType, academicLevel, deadline, pages, paperType } = formData;
    
    // Get base price
    let basePrice = 0;
    let actualDocType = documentType;
    
    // Handle seminar paper types
    if (documentType === 'seminar_theoretical' || documentType === 'seminar_research') {
      actualDocType = documentType;
    } else if (documentType === 'seminar' && paperType === 'research') {
      actualDocType = 'seminar_research';
    } else if (documentType === 'seminar' && paperType === 'theoretical') {
      actualDocType = 'seminar_theoretical';
    }
    
    if (basePrices[actualDocType] && basePrices[actualDocType][academicLevel]) {
      basePrice = basePrices[actualDocType][academicLevel];
    } else {
      // Fallback to essay undergraduate if combination doesn't exist
      basePrice = basePrices.essay.undergraduate;
    }
    
    // Apply deadline multiplier
    const multiplier = deadlineMultipliers[deadline] || 1.0;
    
    // Calculate price without VAT
    const priceNoVat = basePrice * multiplier * pages;
    setPriceWithoutVat(Math.round(priceNoVat));
    
    // Calculate total price with VAT
    const totalPrice = priceNoVat * (1 + vatRate / 100);
    setPrice(Math.round(totalPrice));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would proceed to the order form
    window.location.href = `/${language}/contact?type=${formData.documentType}&level=${formData.academicLevel}&deadline=${formData.deadline}&pages=${formData.pages}&price=${price}`;
  };
  
  // Show paper type selection only for seminar papers
  const showPaperTypeSelection = formData.documentType === 'seminar';
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 md:p-8 animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        {t('calculator.title')}
      </h3>
      <p className="text-center text-gray-600 mb-8">
        {t('calculator.subtitle')}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="documentType" className="block text-gray-700 font-medium mb-2">
              {t('calculator.document_type')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
                <FaFileAlt />
              </div>
              <select
                id="documentType"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir={dir}
              >
                <option value="essay">{t('calculator.types.essay')}</option>
                <option value="research">{t('calculator.types.research')}</option>
                <option value="thesis">{t('calculator.types.thesis')}</option>
                <option value="dissertation">{t('calculator.types.dissertation')}</option>
                <option value="seminar_theoretical">{t('calculator.types.seminar_theoretical')}</option>
                <option value="seminar_research">{t('calculator.types.seminar_research')}</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="academicLevel" className="block text-gray-700 font-medium mb-2">
              {t('calculator.academic_level')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <select
                id="academicLevel"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir={dir}
              >
                <option value="highschool">{t('calculator.levels.highschool')}</option>
                <option value="undergraduate">{t('calculator.levels.undergraduate')}</option>
                <option value="masters">{t('calculator.levels.masters')}</option>
                <option value="phd">{t('calculator.levels.phd')}</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
              {t('calculator.deadline')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
                <FaClock />
              </div>
              <select
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir={dir}
              >
                <option value="14">{t('calculator.deadlines.days', { count: 14 })}</option>
                <option value="7">{t('calculator.deadlines.days', { count: 7 })}</option>
                <option value="5">{t('calculator.deadlines.days', { count: 5 })}</option>
                <option value="3">{t('calculator.deadlines.days', { count: 3 })}</option>
                <option value="2">{t('calculator.deadlines.days', { count: 2 })}</option>
                <option value="1">{t('calculator.deadlines.day', { count: 1 })}</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="pages" className="block text-gray-700 font-medium mb-2">
              {t('calculator.pages')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 pointer-events-none text-gray-500">
                <FaFileAlt />
              </div>
              <input
                type="number"
                id="pages"
                name="pages"
                min="1"
                max="100"
                value={formData.pages}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pl-10 rtl:pr-10 rtl:pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="ltr"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t('calculator.page_description')}
            </p>
          </div>
        </div>
        
        {/* VAT Rate Admin Control (would be hidden in production) */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <FaPercent className="text-gray-500 mr-2 rtl:ml-2 rtl:mr-0" />
            <label htmlFor="vatRate" className="block text-gray-700 font-medium">
              VAT Rate (%)
            </label>
          </div>
          <input
            type="number"
            id="vatRate"
            min="0"
            max="30"
            value={vatRate}
            onChange={(e) => setVatRate(Number(e.target.value))}
            className="w-full bg-white border border-gray-300 text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">
            Admin control to update VAT rate (currently {vatRate}%)
          </p>
        </div>
        
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-primary-500 text-xl mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="font-medium text-gray-700">{t('calculator.estimated_price')}:</span>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {price} {t('calculator.currency')}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Price without VAT: {priceWithoutVat} {t('calculator.currency')}</span>
            <span>{t('calculator.vat_included', { vatRate })}</span>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          {t('calculator.order_now')}
        </button>
      </form>
    </div>
  );
}
