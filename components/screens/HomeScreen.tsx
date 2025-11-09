import React, { useState, useEffect } from 'react';
import type { Screen, DogProfile } from '../../types';
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
    const [profile, setProfile] = useState<DogProfile | null>(null);
    
    useEffect(() => {
        const savedProfile = localStorage.getItem('paws-dog-profile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const quickLinks = [
        { label: 'Health Check', screen: 'Health', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1.44.7 2.88.7-1.44H15"/></svg> },
        { label: 'Start Walk', screen: 'Fitness', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
        { label: 'Training', screen: 'Training', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14v8"/><path d="M15.34 11.66 12 15l-3.34-3.34"/><path d="M12 3v2.72"/><path d="m18.2 6.8-.5.87"/><path d="M6.3 7.67l-.5-.87"/><path d="M12 21a9 9 0 0 0 9-9c0-4.09-2.7-7.5-6.33-8.68"/></svg> },
        { label: 'My Dog', screen: 'Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                {profile ? (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Welcome back,</h1>
                        <p className="text-3xl font-bold text-blue-600">{profile.name}!</p>
                    </div>
                ) : (
                     <div className="text-center">
                        <h1 className="text-4xl font-bold">Welcome to DogsLife</h1>
                        <p className="text-lg text-slate-500 mt-2">Your all-in-one pet care assistant.</p>
                    </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map(link => (
                        <QuickLink key={link.screen} label={link.label} icon={link.icon} onClick={() => setActiveScreen(link.screen as Screen)} />
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="font-bold text-lg mb-2">Today's Tip</h3>
                    <p className="text-slate-600">
                        Positive reinforcement, like treats and praise, is the most effective way to train your dog. Keep training sessions short and fun to maintain their focus!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;