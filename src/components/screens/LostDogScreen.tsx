import React, { useState, useEffect } from 'react';
import type { LostDogAlert, DogProfile } from '../../types';
import LostDogAlertsMapView from '../lostdog/AlertsMapView';
import LostDogAlertListItem from '../lostdog/LostDogAlertListItem';
import CreateLostDogAlertModal from '../lostdog/CreateLostDogAlertModal';

const MOCK_ALERTS: LostDogAlert[] = [
    { 
        id: 'mock1', 
        dogName: 'Buddy', 
        dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400', 
        lastSeenLocation: { lat: 37.785, lng: -122.440 }, 
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        status: 'active' 
    },
];

const LostDogScreen: React.FC = () => {
    const [alerts, setAlerts] = useState<LostDogAlert[]>(() => {
        try {
            const saved = localStorage.getItem('paws-lost-dog-alerts');
            return saved ? JSON.parse(saved) : MOCK_ALERTS;
        } catch {
            return MOCK_ALERTS;
        }
    });

    const [profile, setProfile] = useState<DogProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('paws-lost-dog-alerts', JSON.stringify(alerts));
    }, [alerts]);
    
    useEffect(() => {
        const savedProfile = localStorage.getItem('paws-dog-profile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleCreateAlert = (alertData: Omit<LostDogAlert, 'id'>) => {
        const newAlert: LostDogAlert = {
            ...alertData,
            id: new Date().toISOString(),
        };
        setAlerts(prev => [newAlert, ...prev]);
        setIsModalOpen(false);
    };

    const handleResolveAlert = (alertId: string) => {
        if (window.confirm("Are you sure this dog has been found?")) {
            setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'found' } : a));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Lost Dog Alerts</h2>
                    {profile?.name ? (
                        <button onClick={() => setIsModalOpen(true)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Create Alert
                        </button>
                    ) : (
                        <p className="text-sm text-slate-500 bg-slate-100 p-2 rounded-md">Create a dog profile to post alerts.</p>
                    )}
                </div>
                
                <div className="mb-6">
                    <LostDogAlertsMapView alerts={alerts.filter(a => a.status === 'active')} />
                </div>

                <div className="space-y-4">
                    {alerts.length > 0 ? (
                        alerts
                            .sort((a, b) => (a.status === 'found' ? 1 : -1) - (b.status === 'found' ? 1 : -1) || new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map(alert => (
                           <LostDogAlertListItem key={alert.id} alert={alert} onMarkAsFound={handleResolveAlert} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg border">
                            <p className="text-slate-500">No active alerts in your area.</p>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && profile && (
                <CreateLostDogAlertModal 
                    dogProfile={profile}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateAlert}
                />
            )}
        </div>
    );
};

export default LostDogScreen;
