
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';
import VisualRod from './VisualRod';

interface BeginnerLevelProps {
  onLevelComplete: () => void;
}

const BeginnerLevel: React.FC<BeginnerLevelProps> = ({ onLevelComplete }) => {
  const { translate } = useLanguage();
  const { setIsPlaying, addToProgress, loseLife, lives } = useGame();
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [group1, setGroup1] = useState<string[]>([]);
  const [group2, setGroup2] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<'even' | 'odd' | null>(null);

  useEffect(() => {
    if (gameStarted) {
      setIsPlaying(true);
      generateNewNumber();
    }
  }, [gameStarted]);

  const generateNewNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 10) + 1;
    } while (newNumber === lastNumber);
    
    setLastNumber(currentNumber);
    setCurrentNumber(newNumber);
    setShowValidation(false);
    setIsCorrect(null);
    setGroup1([]);
    setGroup2([]);
    setSelectedChoice(null);
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
        // Handle game over
        setGameStarted(false);
      }
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (correct || lives > 1) {
        generateNewNumber();
      }
    }, 2000);
  };

  const getNumberColor = (num: number) => {
    return num % 2 === 0 ? 'text-red-500' : 'text-blue-500';
  };

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
          {translate('beginner_level')}
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          {translate('can_you_split')}
        </p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {translate('start')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Current number display */}
      <div className="text-center mb-8">
        <div className={`text-8xl font-bold mb-4 ${getNumberColor(currentNumber)}`}>
          {currentNumber}
        </div>
        <p className="text-xl text-gray-600 mb-4">
          {translate('can_you_split')}
        </p>
      </div>

      {/* Visual rod representation */}
      <div className="mb-8">
        <VisualRod number={currentNumber} size="large" />
      </div>

      {/* Group areas */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('group_1')}
          </h3>
          <div className="min-h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            {/* Grouping visualization would go here */}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('group_2')}
          </h3>
          <div className="min-h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            {/* Grouping visualization would go here */}
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
          {!isCorrect && currentNumber % 2 === 1 && (
            <p className="text-sm mt-2 text-gray-600">
              {translate('oops_no_pair')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BeginnerLevel;
