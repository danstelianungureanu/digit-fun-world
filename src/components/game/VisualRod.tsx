
import React from 'react';

interface VisualRodProps {
  number: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const VisualRod: React.FC<VisualRodProps> = ({ number, className = '', size = 'medium' }) => {
  const getRodConfig = (num: number) => {
    const configs = {
      1: { color: 'bg-red-800', shape: 'circle', count: 1 },
      2: { color: 'bg-red-500', shape: 'circle', count: 2 },
      3: { color: 'bg-orange-500', shape: 'square', count: 3 },
      4: { color: 'bg-orange-500', shape: 'square', count: 4 },
      5: { color: 'bg-yellow-700', shape: 'triangle', count: 5 },
      6: { color: 'bg-yellow-400', shape: 'triangle', count: 6 },
      7: { color: 'bg-green-500', shape: 'rectangle', count: 7 },
      8: { color: 'bg-blue-500', shape: 'rectangle', count: 8 },
      9: { color: 'bg-blue-800', shape: 'oval', count: 9 },
      10: { color: 'bg-purple-600', shape: 'diamond', count: 10 }
    };
    return configs[num as keyof typeof configs] || configs[1];
  };

  const config = getRodConfig(number);
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const baseSize = sizeClasses[size];

  const renderShape = (index: number) => {
    const shapeClasses = `${baseSize} ${config.color} transition-all duration-300 hover:scale-110 hover:brightness-110 cursor-pointer`;
    
    switch (config.shape) {
      case 'circle':
        return (
          <div key={index} className={`${shapeClasses} rounded-full relative group`}>
            <div className="absolute inset-2 bg-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      case 'square':
        return (
          <div key={index} className={`${shapeClasses} relative group`}>
            <div className="absolute inset-2 bg-white opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      case 'triangle':
        return (
          <div key={index} className={`${shapeClasses} relative group`}>
            <div className="absolute inset-0 bg-white opacity-80 group-hover:opacity-100 transition-opacity clip-triangle"></div>
          </div>
        );
      case 'rectangle':
        return (
          <div key={index} className={`${shapeClasses} rounded-sm relative group`}>
            <div className="absolute inset-2 bg-white rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      case 'oval':
        return (
          <div key={index} className={`${shapeClasses} rounded-full relative group transform scale-x-150`}>
            <div className="absolute inset-2 bg-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      case 'diamond':
        return (
          <div key={index} className={`${shapeClasses} relative group transform rotate-45`}>
            <div className="absolute inset-2 bg-white opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
      default:
        return (
          <div key={index} className={`${shapeClasses} rounded-full relative group`}>
            <div className="absolute inset-2 bg-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 items-center justify-center p-4 ${className}`}>
      {Array.from({ length: config.count }, (_, index) => renderShape(index))}
    </div>
  );
};

export default VisualRod;
