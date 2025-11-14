import React from 'react';
import type { Screen } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HomeScreenProps {
    setActiveScreen: (screen: Screen) => void;
}

const QuickLink: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => {
    const { currentTheme } = useTheme();
    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center p-4 rounded-lg text-center transition-colors" style={{ backgroundColor: currentTheme.card, border: `1px solid ${currentTheme.border}` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: currentTheme.secondary, color: currentTheme.primary }}>
                {icon}
            </div>
            <span className="font-semibold text-sm" style={{ color: currentTheme.cardForeground }}>{label}</span>
        </button>
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveScreen }) => {

    const quickLinks = [
        { label: 'Health Check', screen: 'Health', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1.44.7 2.88.7-1.44H15"/></svg> },
        { label: 'Start Walk', screen: 'Fitness', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
        { label: 'Playdates', screen: 'Playdates', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
        { label: 'Lost Dog', screen: 'Map', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
        { label: 'My Dog', screen: 'Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
        { label: 'My Profile', screen: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <img src="/Logo.png" alt="DogsLife Logo" className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold">Welcome to DogsLife</h1>
                    <p className="text-lg text-slate-500 mt-2">Your all-in-one pet care assistant.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {quickLinks.map(link => (
                        <QuickLink key={link.label} label={link.label} icon={link.icon} onClick={() => setActiveScreen(link.screen as Screen)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
