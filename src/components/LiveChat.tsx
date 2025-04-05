'use client';

import { useState } from 'react';
import { useTranslation } from '../app/i18n/client';
import { FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

export default function LiveChat({ lng }) {
  const { t, dir } = useTranslation();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      sender: 'system', 
      text: 'ברוכים הבאים לצ\'אט התמיכה שלנו. כיצד נוכל לעזור לך היום?',
      textEn: 'Welcome to our support chat. How can we help you today?',
      textAr: 'مرحبًا بكم في دردشة الدعم لدينا. كيف يمكننا مساعدتك اليوم؟',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const responseText = {
        he: 'תודה על פנייתך. אחד מהנציגים שלנו יחזור אליך בהקדם. לחלופין, אתה יכול ליצור קשר ישירות בוואטסאפ לשירות מהיר יותר.',
        en: 'Thank you for your message. One of our representatives will get back to you shortly. Alternatively, you can contact us directly on WhatsApp for faster service.',
        ar: 'شكرًا على رسالتك. سيعاود أحد ممثلينا الاتصال بك قريبًا. بدلاً من ذلك، يمكنك الاتصال بنا مباشرة على WhatsApp للحصول على خدمة أسرع.'
      };
      
      const response = {
        id: chatHistory.length + 2,
        sender: 'agent',
        text: responseText.he,
        textEn: responseText.en,
        textAr: responseText.ar,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const getMessageText = (message) => {
    if (message.sender === 'user') return message.text;
    
    if (lng === 'en' && message.textEn) return message.textEn;
    if (lng === 'ar' && message.textAr) return message.textAr;
    return message.text;
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="bg-primary-500 text-white p-4">
        <h3 className="font-bold text-lg">{t('contact.live_chat.title')}</h3>
        <p className="text-sm opacity-80">{t('contact.live_chat.subtitle')}</p>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {chatHistory.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'user' 
                  ? 'bg-primary-100 text-gray-800' 
                  : msg.sender === 'agent' 
                    ? 'bg-white border border-gray-200 text-gray-800' 
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{getMessageText(msg)}</p>
              <span className="text-xs text-gray-500 block text-right mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('contact.live_chat.input_placeholder')}
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            dir={dir}
          />
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 rounded-r-md transition-colors"
          >
            <FaPaperPlane />
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <a
            href="https://wa.me/9721234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <FaWhatsapp className="mr-2 rtl:ml-2 rtl:mr-0 text-lg" />
            {t('contact.live_chat.whatsapp_option')}
          </a>
        </div>
      </form>
    </div>
  );
}
