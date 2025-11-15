import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ThemeName, ColorMode, Theme, UnitSystem } from '../types';
import { themes } from '../styles/theme';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  resolvedMode: 'light' | 'dark';
  currentTheme: Theme;
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  communityPostDistance: string;
  setCommunityPostDistance: (distance: string) => void;
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

  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    try {
      const saved = localStorage.getItem('paws-unit-system');
      return (saved as UnitSystem) || 'metric';
    } catch {
      return 'metric';
    }
  });

  const [communityPostDistance, setCommunityPostDistance] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('paws-community-distance');
      return saved || (unitSystem === 'metric' ? '10 Kms' : '10 miles');
    } catch {
      return unitSystem === 'metric' ? '10 Kms' : '10 miles';
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
    localStorage.setItem('paws-unit-system', unitSystem);
  }, [unitSystem]);

  useEffect(() => {
    localStorage.setItem('paws-community-distance', communityPostDistance);
  }, [communityPostDistance]);

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
    unitSystem,
    setUnitSystem,
    communityPostDistance,
    setCommunityPostDistance,
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
