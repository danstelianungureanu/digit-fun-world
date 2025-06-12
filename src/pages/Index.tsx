
import React, { useState } from 'react';
import LanguageSelector from '../components/game/LanguageSelector';
import GameLevelSelector from '../components/game/GameLevelSelector';
import GameHeader from '../components/game/GameHeader';
import BeginnerLevel from '../components/game/BeginnerLevel';
import IntermediateLevel from '../components/game/IntermediateLevel';
import AdvancedLevel from '../components/game/AdvancedLevel';
import ProLevel from '../components/game/ProLevel';
import { GameProvider } from '../contexts/GameContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Confetti from '../components/ui/Confetti';

export type GameLevel = 'selector' | 'beginner' | 'intermediate' | 'advanced' | 'pro';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>('selector');
  const [showConfetti, setShowConfetti] = useState(false);

  const renderLevel = () => {
    switch (currentLevel) {
      case 'beginner':
        return <BeginnerLevel onLevelComplete={() => setShowConfetti(true)} />;
      case 'intermediate':
        return <IntermediateLevel onLevelComplete={() => setShowConfetti(true)} />;
      case 'advanced':
        return <AdvancedLevel onLevelComplete={() => setShowConfetti(true)} />;
      case 'pro':
        return <ProLevel onLevelComplete={() => setShowConfetti(true)} />;
      default:
        return <GameLevelSelector onLevelSelect={setCurrentLevel} />;
    }
  };

  return (
    <LanguageProvider>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {currentLevel !== 'selector' && (
            <GameHeader 
              onBackToSelector={() => setCurrentLevel('selector')}
              currentLevel={currentLevel}
            />
          )}
          
          <main className="container mx-auto px-4 py-8">
            {renderLevel()}
          </main>

          {showConfetti && (
            <Confetti onComplete={() => setShowConfetti(false)} />
          )}
        </div>
      </GameProvider>
    </LanguageProvider>
  );
};

export default Index;
