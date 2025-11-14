import React, { useState, useEffect } from 'react';
import type { Screen } from './types';
import { useTheme } from './context/ThemeContext';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import SymptomCheckerScreen from './components/screens/SymptomCheckerScreen';
import FitnessScreen from './components/screens/FitnessScreen';
import DogProfileScreen from './components/screens/DogProfileScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import CommunityScreen from './components/screens/CommunityScreen';
import JournalScreen from './components/screens/JournalScreen';
import NutritionScreen from './components/screens/NutritionScreen';
import ServicesScreen from './components/screens/ServicesScreen';
import PlaydateScreen from './components/screens/PlaydateScreen';
import LostDogScreen from './components/screens/LostDogScreen';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('Home');
  const { currentTheme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'Health':
        return <SymptomCheckerScreen />;
      case 'Fitness':
        return <FitnessScreen />;
      case 'Profile':
        return <DogProfileScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Community':
        return <CommunityScreen />;
      case 'Journal':
        return <JournalScreen />;
      case 'Map':
          return <LostDogScreen />;
      case 'Nutrition':
          return <NutritionScreen />;
      case 'Services':
          return <ServicesScreen />;
      case 'Playdates':
          return <PlaydateScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20">
        {renderScreen()}
      </main>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  );
};

export default App;
