
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGame } from '../../contexts/GameContext';
import { GameLevel } from '../../pages/Index';
import { Heart, Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  onBackToSelector: () => void;
  currentLevel: GameLevel;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onBackToSelector, currentLevel }) => {
  const { translate } = useLanguage();
  const { lives, score, time, isPlaying, isPaused, setIsPlaying, setIsPaused, resetGame, progress } = useGame();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLevelTitle = () => {
    const titles = {
      beginner: translate('beginner_level'),
      intermediate: translate('intermediate_level'),
      advanced: translate('advanced_level'),
      pro: translate('pro_level'),
      selector: ''
    };
    return titles[currentLevel];
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPaused(!isPaused);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleRestart = () => {
    resetGame();
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-400 to-purple-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left section - Back button and game title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSelector}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">{translate('back')}</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {getLevelTitle()}
            </h1>
          </div>

          {/* Center section - Progress bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="flex h-full">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 mx-0.5 transition-all duration-500 ${
                      i < progress
                        ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg scale-105'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right section - Game controls and stats */}
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <Heart
                  key={i}
                  size={24}
                  className={`transition-all duration-300 ${
                    i < lives
                      ? 'text-red-500 fill-red-500 animate-pulse'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="text-sm text-gray-500">{translate('score')}</div>
              <div className="font-bold text-lg text-blue-600">{score.toLocaleString()}</div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="text-sm text-gray-500">{translate('time')}</div>
              <div className="font-bold text-lg text-purple-600">{formatTime(time)}</div>
            </div>

            {/* Control buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePlayPause}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                title={isPaused ? translate('start') : translate('pause')}
              >
                {isPaused || !isPlaying ? <Play size={20} /> : <Pause size={20} />}
              </button>
              <button
                onClick={handleRestart}
                className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                title={translate('restart')}
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
