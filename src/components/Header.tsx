import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <header 
      className="shadow-md z-10 transition-colors duration-300"
      style={{ backgroundColor: currentTheme.card, borderBottom: `1px solid ${currentTheme.border}` }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
            <img src="./Logo.png" alt="DogsLife Logo" className="h-8 w-8" />
          <h1 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: currentTheme.cardForeground }}
          >
            DogsLife
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
