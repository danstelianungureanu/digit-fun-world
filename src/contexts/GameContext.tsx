
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  lives: number;
  setLives: (lives: number) => void;
  score: number;
  setScore: (score: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  time: number;
  setTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  resetGame: () => void;
  addToProgress: () => void;
  loseLife: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setProgress(0);
    setTime(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const addToProgress = () => {
    setProgress(prev => {
      const newProgress = prev + 1;
      if (newProgress >= 10) {
        setScore(prevScore => prevScore + 100);
        return 0; // Reset progress bar
      }
      return newProgress;
    });
  };

  const loseLife = (): boolean => {
    const newLives = lives - 1;
    setLives(newLives);
    return newLives <= 0;
  };

  return (
    <GameContext.Provider value={{
      lives, setLives,
      score, setScore,
      progress, setProgress,
      time, setTime,
      isPlaying, setIsPlaying,
      isPaused, setIsPaused,
      resetGame,
      addToProgress,
      loseLife
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
