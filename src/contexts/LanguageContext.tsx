
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

export type Language = 'ro' | 'en' | 'hu' | 'de' | 'es' | 'fr' | 'it' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('gameLanguage');
    return (saved as Language) || 'ro';
  });

  useEffect(() => {
    localStorage.setItem('gameLanguage', language);
  }, [language]);

  const translate = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
