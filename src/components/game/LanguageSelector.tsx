
import React from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const languages: { code: Language; flag: string; name: string }[] = [
  { code: 'ro', flag: '🇷🇴', name: 'Română' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'hu', flag: '🇭🇺', name: 'Magyar' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' }
];

interface LanguageSelectorProps {
  onLanguageSelect?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const { language, setLanguage, translate } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onLanguageSelect?.();
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        {translate('select_language')}
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              language === lang.code
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="text-4xl mb-2">{lang.flag}</div>
            <div className="text-lg font-semibold text-gray-800">{lang.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
