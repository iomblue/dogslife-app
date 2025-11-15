import React from 'react';
import type { Screen } from '../types';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
    activeScreen: Screen;
    setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => {
    const { currentTheme } = useTheme();
    const activeColor = currentTheme.primary;
    const inactiveColor = currentTheme.mutedForeground;

    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full transition-colors">
            <div style={{ color: isActive ? activeColor : inactiveColor }}>{icon}</div>
            <span className={`text-xs font-medium ${isActive ? '' : ''}`} style={{ color: isActive ? activeColor : inactiveColor }}>{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
    const { currentTheme } = useTheme();

    const navItems = [
        { label: 'Home', screen: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
        { label: 'Health', screen: 'Health', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1.44.7 2.88.7-1.44H15"/></svg> },
        { label: 'Fitness', screen: 'Fitness', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 14v-3.5a2.5 2.5 0 1 1 5 0V14"/><path d="M10.5 14h.5m-5 0h.5"/><path d="M4 14v-3.5a2.5 2.5 0 1 1 5 0V14"/><path d="M10.2 20.4a2 2 0 0 0 3.6 0"/><path d="M21 14h-5.5"/><path d="M4 14H3"/><path d="M15 14H9.5"/><circle cx="12" cy="14" r="8"/><path d="M12 2v2"/></svg> },
        { label: 'Community', screen: 'Community', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
        { label: 'Profile', screen: 'My Profile', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 border-t" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
            <div className="flex justify-around items-center h-full">
                {navItems.map(item => (
                    <NavItem 
                        key={item.label} 
                        icon={item.icon} 
                        label={item.label} 
                        isActive={activeScreen === item.screen} 
                        onClick={() => setActiveScreen(item.screen as Screen)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
