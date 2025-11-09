import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ThemeName, ColorMode, Theme } from '../types';
import { themes } from '../styles/theme';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  resolvedMode: 'light' | 'dark';
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem('paws-theme-name');
      return (saved as ThemeName) || 'trustCare';
    } catch {
      return 'trustCare';
    }
  });

  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    try {
      const saved = localStorage.getItem('paws-color-mode');
      return (saved as ColorMode) || 'system';
    } catch {
      return 'system';
    }
  });

  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    localStorage.setItem('paws-theme-name', themeName);
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem('paws-color-mode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setSystemMode(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedMode = useMemo(() => {
    return colorMode === 'system' ? systemMode : colorMode;
  }, [colorMode, systemMode]);

  const currentTheme = themes[themeName][resolvedMode];

  const value = {
    themeName,
    setThemeName,
    colorMode,
    setColorMode,
    resolvedMode,
    currentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
