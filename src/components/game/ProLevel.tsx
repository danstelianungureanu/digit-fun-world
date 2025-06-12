
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';

interface ProLevelProps {
  onLevelComplete: () => void;
}

const ProLevel: React.FC<ProLevelProps> = ({ onLevelComplete }) => {
  const { translate } = useLanguage();
  const { setIsPlaying, addToProgress, loseLife, lives } = useGame();
  const [gameStarted, setGameStarted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [classifications, setClassifications] = useState<{[key: number]: 'even' | 'odd' | null}>({});
  const [digitCount, setDigitCount] = useState(4);

  useEffect(() => {
    if (gameStarted) {
      setIsPlaying(true);
      generateNewNumbers();
    }
  }, [gameStarted, digitCount]);

  const generateNewNumbers = () => {
    const newNumbers = [];
    const min = Math.pow(10, digitCount - 1);
    const max = Math.pow(10, digitCount) - 1;
    
    for (let i = 0; i < 3; i++) {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (newNumbers.includes(newNumber));
      newNumbers.push(newNumber);
    }
    
    setNumbers(newNumbers);
    setClassifications({});
    setShowValidation(false);
    setIsCorrect(null);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const formatNumberWithClasses = (num: number) => {
    const numStr = num.toString().padStart(9, '0');
    const millions = numStr.slice(0, 3);
    const thousands = numStr.slice(3, 6);
    const units = numStr.slice(6, 9);
    
    return { millions, thousands, units };
  };

  const handleClassification = (number: number, classification: 'even' | 'odd') => {
    setClassifications(prev => ({
      ...prev,
      [number]: classification
    }));
  };

  const validateAnswers = () => {
    let allCorrect = true;
    
    for (const num of numbers) {
      const isEven = num % 2 === 0;
      const classification = classifications[num];
      const correct = (classification === 'even' && isEven) || (classification === 'odd' && !isEven);
      
      if (!correct) {
        allCorrect = false;
        break;
      }
    }
    
    setIsCorrect(allCorrect);
    setShowValidation(true);

    if (allCorrect) {
      addToProgress();
      onLevelComplete();
    } else {
      const gameOver = loseLife();
      if (gameOver) {
        setGameStarted(false);
      }
    }

    setTimeout(() => {
      if (allCorrect || lives > 1) {
        generateNewNumbers();
      }
    }, 2000);
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {translate('pro_level')}
        </h2>
        
        {/* Digit count selector */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-4 text-gray-700">
            Select number of digits:
          </label>
          <div className="flex justify-center gap-2">
            {[4, 5, 6, 7, 8, 9].map((count) => (
              <button
                key={count}
                onClick={() => setDigitCount(count)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  digitCount === count
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-red-400 to-purple-600 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {translate('start')}
        </button>
      </div>
    );
  }

  const allClassified = numbers.every(num => classifications[num]);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Classify the numbers as Even or Odd
      </h2>

      {/* Numbers display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {numbers.map((number, index) => {
          const { millions, thousands, units } = formatNumberWithClasses(number);
          
          return (
            <div key={number} className="bg-white rounded-lg shadow-lg p-6">
              {/* Place value table */}
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-3 bg-gray-100 text-xs font-semibold">
                  <div className="p-2 border-r bg-orange-100 text-center">
                    {translate('millions')}
                  </div>
                  <div className="p-2 border-r bg-red-100 text-center">
                    {translate('thousands')}
                  </div>
                  <div className="p-2 bg-blue-100 text-center">
                    {translate('units')}
                  </div>
                </div>
                <div className="grid grid-cols-9 text-center">
                  {/* Millions */}
                  {millions.split('').map((digit, i) => (
                    <div key={`m${i}`} className="p-2 border-r border-b bg-orange-50 text-sm">
                      {digit !== '0' ? digit : ''}
                    </div>
                  ))}
                  {/* Thousands */}
                  {thousands.split('').map((digit, i) => (
                    <div key={`t${i}`} className="p-2 border-r border-b bg-red-50 text-sm">
                      {digit !== '0' || number >= 1000 ? digit : ''}
                    </div>
                  ))}
                  {/* Units */}
                  {units.split('').map((digit, i) => (
                    <div key={`u${i}`} className="p-2 border-b bg-blue-50 text-sm">
                      {digit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Number display */}
              <div className="text-2xl font-bold text-center mb-4 text-gray-800">
                {number.toLocaleString()}
              </div>

              {/* Classification buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleClassification(number, 'even')}
                  disabled={showValidation}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    classifications[number] === 'even'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {translate('even')}
                </button>
                <button
                  onClick={() => handleClassification(number, 'odd')}
                  disabled={showValidation}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    classifications[number] === 'odd'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {translate('odd')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation button */}
      {allClassified && !showValidation && (
        <div className="text-center">
          <button
            onClick={validateAnswers}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-xl transition-colors duration-200"
          >
            Validate Answers
          </button>
        </div>
      )}

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

export default ProLevel;
