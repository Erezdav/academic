'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FaGraduationCap, FaClock, FaFileAlt, FaMoneyBillWave, FaPercent } from 'react-icons/fa';

export default function PriceCalculator() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    documentType: 'essay',
    academicLevel: 'undergraduate',
    deadline: '7',
    pages: 1,
    paperType: 'theoretical' // ברירת מחדל לעבודות סמינריוניות
  });
  
  const [price, setPrice] = useState(0);
  const [vatRate, setVatRate] = useState(18); // שיעור המע"מ באחוזים
  const [priceWithoutVat, setPriceWithoutVat] = useState(0);
  
  // מחירי בסיס לעמוד (בש"ח)
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
  
  // מכפילי תאריך יעד
  const deadlineMultipliers = {
    '1': 2.0,  // יום אחד
    '2': 1.8,  // יומיים
    '3': 1.6,  // 3 ימים
    '5': 1.4,  // 5 ימים
    '7': 1.2,  // 7 ימים
    '14': 1.0  // 14 ימים
  };
  
  // חישוב מחיר בכל פעם שנתוני הטופס משתנים
  useEffect(() => {
    calculatePrice();
  }, [formData, vatRate]);
  
  const calculatePrice = () => {
    const { documentType, academicLevel, deadline, pages, paperType } = formData;
    
    // קבלת מחיר בסיס
    let basePrice = 0;
    let actualDocType = documentType;
    
    // טיפול בסוגי עבודות סמינריוניות
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
      // ברירת מחדל למאמר תואר ראשון אם הצירוף לא קיים
      basePrice = basePrices.essay.undergraduate;
    }
    
    // החלת מכפיל תאריך יעד
    const multiplier = deadlineMultipliers[deadline] || 1.0;
    
    // חישוב מחיר ללא מע"מ
    const priceNoVat = basePrice * multiplier * pages;
    setPriceWithoutVat(Math.round(priceNoVat));
    
    // חישוב מחיר כולל עם מע"מ
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
    // ביישום אמיתי, זה יעבור לטופס ההזמנה
    window.location.href = `/contact?type=${formData.documentType}&level=${formData.academicLevel}&deadline=${formData.deadline}&pages=${formData.pages}&price=${price}`;
  };
  
  // הצגת בחירת סוג מסמך רק לעבודות סמינריוניות
  const showPaperTypeSelection = formData.documentType === 'seminar';
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 md:p-8 animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        מחשבון מחירים
      </h3>
      <p className="text-center text-gray-600 mb-8">
        קבל הערכת מחיר מיידית לעבודה שלך
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="documentType" className="block text-gray-700 font-medium mb-2">
              סוג העבודה
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <FaFileAlt />
              </div>
              <select
                id="documentType"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="rtl"
              >
                <option value="essay">עבודה אקדמית</option>
                <option value="research">עבודת מחקר</option>
                <option value="thesis">תזה</option>
                <option value="dissertation">דיסרטציה</option>
                <option value="seminar_theoretical">עבודה סמינריונית עיונית</option>
                <option value="seminar_research">עבודה סמינריונית מחקרית</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="academicLevel" className="block text-gray-700 font-medium mb-2">
              רמה אקדמית
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <select
                id="academicLevel"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="rtl"
              >
                <option value="highschool">תיכון</option>
                <option value="undergraduate">תואר ראשון</option>
                <option value="masters">תואר שני</option>
                <option value="phd">תואר שלישי</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
              מועד הגשה
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <FaClock />
              </div>
              <select
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="rtl"
              >
                               <option value="7">חודשיים +  </option>
                <option value="5">חודשיים </option>
                <option value="3">חודש</option>
                <option value="2">ימים  21 </option>
                <option value="1">ימים מהיום     14</option


              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="pages" className="block text-gray-700 font-medium mb-2">
              מספר עמודים
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
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
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md py-3 pr-10 pl-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                dir="rtl"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              עמוד = מתחיל ב 150 מילים
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-primary-500 text-xl ml-2" />
              <span className="font-medium text-gray-700">מחיר משוער:</span>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {price} ₪
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>מחיר ללא מע"מ: {priceWithoutVat} ₪</span>
            <span>כולל מע"מ ({vatRate}%)</span>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          הזמן עכשיו
        </button>
      </form>
    </div>
  );
}