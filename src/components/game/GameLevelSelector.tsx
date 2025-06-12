
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GameLevel } from '../../pages/Index';
import LanguageSelector from './LanguageSelector';

interface GameLevelSelectorProps {
  onLevelSelect: (level: GameLevel) => void;
}

const GameLevelSelector: React.FC<GameLevelSelectorProps> = ({ onLevelSelect }) => {
  const { translate } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  if (showLanguageSelector) {
    return <LanguageSelector onLanguageSelect={() => setShowLanguageSelector(false)} />;
  }

  const levels = [
    {
      id: 'beginner' as GameLevel,
      title: translate('beginner_level'),
      description: '0-10',
      color: 'from-green-400 to-blue-500',
      icon: '🌱'
    },
    {
      id: 'intermediate' as GameLevel,
      title: translate('intermediate_level'),
      description: '11-31',
      color: 'from-yellow-400 to-orange-500',
      icon: '⚡'
    },
    {
      id: 'advanced' as GameLevel,
      title: translate('advanced_level'),
      description: '100-999',
      color: 'from-purple-400 to-pink-500',
      icon: '🎯'
    },
    {
      id: 'pro' as GameLevel,
      title: translate('pro_level'),
      description: '1,000-999,999,999',
      color: 'from-red-400 to-purple-600',
      icon: '👑'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto text-center">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800">
          {translate('even_odd_game')}
        </h1>
        <button
          onClick={() => setShowLanguageSelector(true)}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title={translate('select_language')}
        >
          <span className="text-2xl">🌐</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelSelect(level.id)}
            className={`relative p-8 rounded-2xl bg-gradient-to-br ${level.color} text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">{level.icon}</div>
              <h3 className="text-xl font-bold mb-2">{level.title}</h3>
              <p className="text-sm opacity-90">{level.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameLevelSelector;
