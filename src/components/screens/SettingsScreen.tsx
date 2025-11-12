import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { themes } from '../../styles/theme';
import type { ThemeName, UnitSystem } from '../../types';

// Import all required types for mock data
import { DogProfile, MedicalRecord, MedicalRecordType, Walk, JournalEntry, SymptomAnalysisHistoryItem, UrgencyLevel, FeedingScheduleItem, WeightRecord, LostDogAlert, DogService, ServiceType, PlaydateMatch, PlaydateProfile, DogSize, Temperament, PlayStyle, Expense, ExpenseCategory } from '../../types';


const SettingsScreen: React.FC = () => {
    const { themeName, setThemeName, colorMode, setColorMode, resolvedMode, currentTheme, unitSystem, setUnitSystem } = useTheme();

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all app data? This cannot be undone.")) {
            localStorage.removeItem('paws-dog-profile');
            localStorage.removeItem('paws-medical-records');
            localStorage.removeItem('paws-walks');
            localStorage.removeItem('paws-journal');
            localStorage.removeItem('paws-symptom-history');
            localStorage.removeItem('paws-feeding-schedule');
            localStorage.removeItem('paws-weight-history');
            localStorage.removeItem('paws-training-plans');
            localStorage.removeItem('paws-lost-dog-alerts');
            localStorage.removeItem('paws-services');
            localStorage.removeItem('paws-playdate-matches');
            localStorage.removeItem('paws-expenses');
            alert('All data has been cleared.');
            window.location.reload();
        }
    };

    const handleLoadData = () => {
        if (window.confirm("This will replace all current data with sample data. Continue?")) {
            // Dog Profile
            const profile: DogProfile = { name: 'Buddy', breed: 'Golden Retriever', dob: '2020-05-15', sex: 'Male', imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400' };
            localStorage.setItem('paws-dog-profile', JSON.stringify(profile));

            // Medical Records
            const records: MedicalRecord[] = [
                { id: '1', type: MedicalRecordType.VACCINATION, date: '2023-08-20', title: 'Rabies Booster', details: '3-year booster shot.', dueDate: '2026-08-20' },
                { id: '2', type: MedicalRecordType.VET_VISIT, date: '2024-02-10', title: 'Annual Checkup', details: 'All clear, healthy weight.' },
            ];
            localStorage.setItem('paws-medical-records', JSON.stringify(records));

            // Walks
            const walks: Walk[] = [
                { id: '1', date: 'Yesterday', duration: 1800, distance: 2.5, route: [{lat: 37.77, lng: -122.45}, {lat: 37.78, lng: -122.46}], avgSpeed: 5.0 },
                { id: '2', date: '2 days ago', duration: 2400, distance: 3.1, route: [{lat: 37.76, lng: -122.44}, {lat: 37.77, lng: -122.45}], avgSpeed: 4.6 },
            ];
            localStorage.setItem('paws-walks', JSON.stringify(walks));

            // Journal
            const journal: JournalEntry[] = [
                { id: '1', date: 'Last week', imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400', caption: 'Fun day at the park!' },
            ];
            localStorage.setItem('paws-journal', JSON.stringify(journal));
            
             // Symptom History
            const symptomHistory: SymptomAnalysisHistoryItem[] = [{ id: '1', date: 'Last month', symptoms: 'Slight limp after playing', urgency: UrgencyLevel.MONITOR, potentialCauses: ['Minor sprain', 'Tired muscle'], redFlags: ['Swelling', 'Inability to bear weight'], clarifyingQuestions: [] }];
            localStorage.setItem('paws-symptom-history', JSON.stringify(symptomHistory));

            // Nutrition
            localStorage.setItem('paws-feeding-schedule', JSON.stringify([{id: '1', time: '08:00', food: 'Kibble', portion: '1.5 cups'}] as FeedingScheduleItem[]));
            localStorage.setItem('paws-weight-history', JSON.stringify([{id: '1', date: '2024-01-01', weight: 34}, {id: '2', date: '2024-04-01', weight: 35}] as WeightRecord[]));
            
            // Expenses
            const expenses: Expense[] = [
                { id: '1', date: '2024-05-10', category: ExpenseCategory.FOOD, amount: 75.50, notes: 'Large bag of kibble' },
                { id: '2', date: '2024-05-02', category: ExpenseCategory.VET, amount: 150.00, notes: 'Annual checkup' }
            ];
            localStorage.setItem('paws-expenses', JSON.stringify(expenses));

            // Lost Dog Alerts
            localStorage.setItem('paws-lost-dog-alerts', JSON.stringify([{ id: 'mock1', dogName: 'Daisy', dogImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', lastSeenLocation: { lat: 37.78, lng: -122.44 }, date: new Date().toISOString(), status: 'active' }] as LostDogAlert[]));
            
            // Services
            localStorage.setItem('paws-services', JSON.stringify([{ id: '1', name: 'Happy Paws Vet Clinic', type: ServiceType.VET, location: { lat: 37.780, lng: -122.430 }, rating: 4.8 }] as DogService[]));
            
             // Playdate Matches
            const myDogPlaydateProfile: PlaydateProfile = { id: 'my-dog', dogName: profile.name, dogImage: profile.imageUrl, breed: profile.breed, age: 4, size: DogSize.LARGE, temperament: [Temperament.FRIENDLY], playStyle: PlayStyle.GENTLE, ownerName: 'Me', ownerImage: '' };
            const theirDogPlaydateProfile: PlaydateProfile = { id: '2', dogName: 'Lucy', dogImage: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400', breed: 'Poodle', age: 2, size: DogSize.MEDIUM, temperament: [Temperament.ENERGETIC], playStyle: PlayStyle.CHASER, ownerName: 'Mia', ownerImage: '' };
            const matches: PlaydateMatch[] = [{
                id: 'match1',
                myDogProfile: myDogPlaydateProfile,
                theirDogProfile: theirDogPlaydateProfile,
                messages: [
                    { id: 'msg1', text: 'Hey! Lucy is so cute. When is she free for a playdate?', sender: 'them', timestamp: '10:01 AM' }
                ],
                lastMessageTimestamp: Date.now(),
            }];
            localStorage.setItem('paws-playdate-matches', JSON.stringify(matches));

            alert('Sample data has been loaded.');
            window.location.reload();
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold" style={{ color: currentTheme.foreground }}>Settings</h2>

                {/* Appearance Section */}
                <div style={{ backgroundColor: currentTheme.card, color: currentTheme.cardForeground, borderColor: currentTheme.border }} className="p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold mb-4">Appearance</h3>
                    
                    {/* Theme Selection */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-3">Theme</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {(Object.keys(themes) as ThemeName[]).map(name => {
                                const theme = themes[name][resolvedMode as keyof typeof themes[ThemeName]];
                                const isActive = themeName === name;
                                return (
                                    <button
                                        key={name}
                                        onClick={() => setThemeName(name)}
                                        className={`p-4 rounded-lg border-2 transition-all ${isActive ? 'ring-2 ring-offset-2' : ''}`}
                                        style={{ borderColor: isActive ? currentTheme.primary : currentTheme.border, backgroundColor: theme.background }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                                        </div>
                                        <p className="mt-3 text-sm font-semibold capitalize" style={{ color: theme.foreground }}>
                                            {name.replace(/([A-Z])/g, ' $1').trim()}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Color Mode Selection */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium mb-3">Color Mode</h4>
                        <div className="flex gap-2">
                            {(['light', 'dark', 'system'] as const).map(mode => (
                                <button 
                                    key={mode}
                                    onClick={() => setColorMode(mode)}
                                    className={`py-2 px-4 rounded-lg font-semibold capitalize transition-colors`}
                                    style={{
                                        backgroundColor: colorMode === mode ? currentTheme.primary : currentTheme.secondary,
                                        color: colorMode === mode ? currentTheme.primaryForeground : currentTheme.secondaryForeground,
                                    }}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Unit System Selection */}
                    <div>
                        <h4 className="text-lg font-medium mb-3">Unit System</h4>
                        <div className="flex gap-2">
                            {(['metric', 'imperial'] as const).map(system => (
                                <button 
                                    key={system}
                                    onClick={() => setUnitSystem(system as UnitSystem)}
                                    className={`py-2 px-4 rounded-lg font-semibold capitalize transition-colors`}
                                    style={{
                                        backgroundColor: unitSystem === system ? currentTheme.primary : currentTheme.secondary,
                                        color: unitSystem === system ? currentTheme.primaryForeground : currentTheme.secondaryForeground,
                                    }}
                                >
                                    {system}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Data Management Section */}
                 <div style={{ backgroundColor: currentTheme.card, color: currentTheme.cardForeground, borderColor: currentTheme.border }} className="p-6 rounded-lg shadow-md border">
                     <h3 className="text-xl font-semibold mb-4">Data Management</h3>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleLoadData} className="w-full text-center py-2 px-4 rounded-lg font-semibold" style={{ backgroundColor: currentTheme.secondary, color: currentTheme.secondaryForeground }}>
                            Load Sample Data
                        </button>
                        <button onClick={handleClearData} className="w-full text-center py-2 px-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600">
                            Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
