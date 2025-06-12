
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';

interface IntermediateLevelProps {
  onLevelComplete: () => void;
}

const IntermediateLevel: React.FC<IntermediateLevelProps> = ({ onLevelComplete }) => {
  const { translate } = useLanguage();
  const { setIsPlaying, addToProgress, loseLife, lives } = useGame();
  const [currentNumber, setCurrentNumber] = useState<number>(11);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<'even' | 'odd' | null>(null);
  const [clickedDots, setClickedDots] = useState<number[]>([]);

  useEffect(() => {
    if (gameStarted) {
      setIsPlaying(true);
      generateNewNumber();
    }
  }, [gameStarted]);

  const generateNewNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 21) + 11; // 11-31
    } while (newNumber === lastNumber);
    
    setLastNumber(currentNumber);
    setCurrentNumber(newNumber);
    setShowValidation(false);
    setIsCorrect(null);
    setSelectedChoice(null);
    setClickedDots([]);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const handleChoice = (choice: 'even' | 'odd') => {
    setSelectedChoice(choice);
    const isEven = currentNumber % 2 === 0;
    const correct = (choice === 'even' && isEven) || (choice === 'odd' && !isEven);
    
    setIsCorrect(correct);
    setShowValidation(true);

    if (correct) {
      addToProgress();
      onLevelComplete();
    } else {
      const gameOver = loseLife();
      if (gameOver) {
        setGameStarted(false);
      }
    }

    setTimeout(() => {
      if (correct || lives > 1) {
        generateNewNumber();
      }
    }, 2000);
  };

  const handleDotClick = (index: number) => {
    if (clickedDots.includes(index)) {
      setClickedDots(clickedDots.filter(i => i !== index));
    } else {
      setClickedDots([...clickedDots, index]);
    }
  };

  const tens = Math.floor(currentNumber / 10);
  const units = currentNumber % 10;

  const getButtonStyle = (choice: 'even' | 'odd') => {
    if (!showValidation || selectedChoice !== choice) {
      return 'bg-gray-400 text-white hover:bg-gray-500';
    }
    
    if (isCorrect) {
      return choice === 'even' 
        ? 'bg-red-500 text-white transform scale-110 animate-pulse' 
        : 'bg-blue-500 text-white transform scale-110 animate-pulse';
    }
    
    return 'bg-gray-400 text-white';
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {translate('intermediate_level')}
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          {translate('can_you_split')}
        </p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {translate('start')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Number display with place value table */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold mb-6">
          <span className="text-gray-500">{tens}</span>
          <span className={units % 2 === 0 ? 'text-red-500' : 'text-blue-500'}>
            {units}
          </span>
        </div>
        
        {/* Place value table */}
        <div className="inline-block border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-2 bg-gray-100 border-b">
            <div className="px-6 py-2 border-r font-semibold">
              {translate('tens')}
            </div>
            <div className="px-6 py-2 font-semibold">
              {translate('units')}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-6 py-4 border-r text-2xl text-gray-500 bg-gray-50">
              {tens}
            </div>
            <div className={`px-6 py-4 text-2xl ${units % 2 === 0 ? 'text-red-500 bg-red-50' : 'text-blue-500 bg-blue-50'}`}>
              {units}
            </div>
          </div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Tens representation */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('tens')} ({tens})
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            {Array.from({ length: tens }, (_, i) => (
              <div key={i} className="flex items-center justify-center gap-1 mb-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} className="w-4 h-4 bg-blue-400 rounded"></div>
                  ))}
                </div>
                <span className="mx-2">=</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} className="w-4 h-4 bg-blue-400 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Units representation */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('units')} ({units})
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {Array.from({ length: units }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    clickedDots.includes(i)
                      ? 'bg-red-500 border-red-600'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {clickedDots.includes(i) && (
                    <span className="text-xs text-white font-bold">
                      {clickedDots.indexOf(i) + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Choice buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleChoice('even')}
          disabled={showValidation}
          className={`px-8 py-4 font-bold text-xl rounded-xl transition-all duration-300 ${getButtonStyle('even')}`}
        >
          {translate('even')}
        </button>
        <button
          onClick={() => handleChoice('odd')}
          disabled={showValidation}
          className={`px-8 py-4 font-bold text-xl rounded-xl transition-all duration-300 ${getButtonStyle('odd')}`}
        >
          {translate('odd')}
        </button>
      </div>

      {/* Feedback message */}
      {showValidation && (
        <div className="text-center mt-6">
          <p className="text-lg font-semibold">
            {isCorrect ? translate('great_job') : translate('almost_there')}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntermediateLevel;
