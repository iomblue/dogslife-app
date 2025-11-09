import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PawPrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="4"></circle>
    <path d="M15.6 15.6c1.2 1.2 2.8 2.2 4.4 2.4"></path>
    <path d="M8.4 15.6c-1.2 1.2-2.8 2.2-4.4 2.4"></path>
    <path d="M12 18.8V22"></path>
    <path d="M4.6 8.4C3.4 7.2 2.4 5.6 2.2 4"></path>
    <path d="M19.4 8.4c1.2-1.2 2.2-2.8 2.4-4.4"></path>
    <path d="M12 5.2V2"></path>
    <path d="M8.4 4.6C7.2 3.4 5.6 2.4 4 2.2"></path>
    <path d="M15.6 4.6c1.2-1.2 2.8-2.2 4.4-2.4"></path>
  </svg>
);

const Header: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <header 
      className="shadow-md z-10 transition-colors duration-300"
      style={{ backgroundColor: currentTheme.card, borderBottom: `1px solid ${currentTheme.border}` }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
            <PawPrintIcon className="h-8 w-8" style={{ color: currentTheme.primary }}/>
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
