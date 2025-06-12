
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';
import VisualRod from './VisualRod';

interface BeginnerLevelProps {
  onLevelComplete: () => void;
}

interface DragElement {
  id: string;
  type: 'circle' | 'square';
  color: string;
}

const BeginnerLevel: React.FC<BeginnerLevelProps> = ({ onLevelComplete }) => {
  const { translate } = useLanguage();
  const { setIsPlaying, addToProgress, loseLife, lives } = useGame();
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [group1, setGroup1] = useState<DragElement[]>([]);
  const [group2, setGroup2] = useState<DragElement[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<'even' | 'odd' | null>(null);
  const [availableElements, setAvailableElements] = useState<DragElement[]>([]);
  const [draggedElement, setDraggedElement] = useState<DragElement | null>(null);

  useEffect(() => {
    if (gameStarted) {
      setIsPlaying(true);
      generateNewNumber();
    }
  }, [gameStarted]);

  const generateElements = (number: number): DragElement[] => {
    const elements: DragElement[] = [];
    for (let i = 0; i < number; i++) {
      elements.push({
        id: `element-${i}`,
        type: i % 2 === 0 ? 'circle' : 'square',
        color: '#3B82F6'
      });
    }
    return elements;
  };

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
    setAvailableElements(generateElements(newNumber));
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const handleDragStart = (e: React.DragEvent, element: DragElement) => {
    setDraggedElement(element);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, groupType: 'group1' | 'group2') => {
    e.preventDefault();
    if (!draggedElement) return;

    // Remove element from available elements
    setAvailableElements(prev => prev.filter(el => el.id !== draggedElement.id));

    // Add element to the specified group
    if (groupType === 'group1') {
      setGroup1(prev => [...prev, draggedElement]);
    } else {
      setGroup2(prev => [...prev, draggedElement]);
    }

    setDraggedElement(null);
  };

  const handleElementClick = (element: DragElement) => {
    // Remove from groups and return to available elements
    setGroup1(prev => prev.filter(el => el.id !== element.id));
    setGroup2(prev => prev.filter(el => el.id !== element.id));
    setAvailableElements(prev => [...prev, element]);
  };

  const handleChoice = (choice: 'even' | 'odd') => {
    // Check if all elements are distributed
    if (availableElements.length > 0) {
      return; // Don't allow validation until all elements are placed
    }

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

  const getNumberColor = (num: number) => {
    return num % 2 === 0 ? 'text-red-500' : 'text-blue-500';
  };

  const getButtonStyle = (choice: 'even' | 'odd') => {
    if (!showValidation || selectedChoice !== choice) {
      return availableElements.length > 0 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
        : 'bg-gray-400 text-white hover:bg-gray-500';
    }
    
    if (isCorrect) {
      return choice === 'even' 
        ? 'bg-red-500 text-white transform scale-110 animate-pulse' 
        : 'bg-blue-500 text-white transform scale-110 animate-pulse';
    }
    
    return 'bg-gray-400 text-white';
  };

  const renderElement = (element: DragElement, index?: number) => {
    const baseClasses = "w-8 h-8 bg-blue-500 cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-xs font-bold";
    
    return (
      <div
        key={element.id}
        className={`${baseClasses} ${element.type === 'circle' ? 'rounded-full' : 'rounded-md'}`}
        draggable
        onDragStart={(e) => handleDragStart(e, element)}
        onClick={() => handleElementClick(element)}
      >
        {index !== undefined && index + 1}
      </div>
    );
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

      {/* Available elements to drag */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          Trage elementele în grupe:
        </h3>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg min-h-20 justify-center items-center">
            {availableElements.map((element) => renderElement(element))}
            {availableElements.length === 0 && (
              <p className="text-gray-500 text-sm">Toate elementele au fost plasate în grupe</p>
            )}
          </div>
        </div>
      </div>

      {/* Group areas */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('group_1')}
          </h3>
          <div 
            className="min-h-32 border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 transition-colors hover:border-blue-400 hover:bg-blue-100"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'group1')}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {group1.map((element, index) => renderElement(element, index))}
              {group1.length === 0 && (
                <p className="text-gray-400 text-sm">Plasează elementele aici</p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Elemente: {group1.length}
          </p>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {translate('group_2')}
          </h3>
          <div 
            className="min-h-32 border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50 transition-colors hover:border-green-400 hover:bg-green-100"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'group2')}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {group2.map((element, index) => renderElement(element, index))}
              {group2.length === 0 && (
                <p className="text-gray-400 text-sm">Plasează elementele aici</p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Elemente: {group2.length}
          </p>
        </div>
      </div>

      {/* Choice buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => handleChoice('even')}
          disabled={showValidation || availableElements.length > 0}
          className={`px-8 py-4 font-bold text-xl rounded-xl transition-all duration-300 ${getButtonStyle('even')}`}
        >
          {translate('even')}
        </button>
        <button
          onClick={() => handleChoice('odd')}
          disabled={showValidation || availableElements.length > 0}
          className={`px-8 py-4 font-bold text-xl rounded-xl transition-all duration-300 ${getButtonStyle('odd')}`}
        >
          {translate('odd')}
        </button>
      </div>

      {availableElements.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Plasează toate elementele în grupe pentru a putea răspunde
          </p>
        </div>
      )}

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
