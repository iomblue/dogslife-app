import React, { useState, useEffect } from 'react';
import type { DogProfile, LostDogAlert, GeoLocation } from '../../types';

interface CreateAlertModalProps {
    dogProfile: DogProfile;
    onClose: () => void;
    onCreate: (alertData: Omit<LostDogAlert, 'id'>) => void;
}

const CreateAlertModal: React.FC<CreateAlertModalProps> = ({ dogProfile, onClose, onCreate }) => {
    const [location, setLocation] = useState<GeoLocation | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsFetchingLocation(false);
            },
            (err) => {
                setError(`Could not get location: ${err.message}. Please enable location services.`);
                setIsFetchingLocation(false);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const handleSubmit = () => {
        if (!location || !dogProfile.name || !dogProfile.imageUrl) {
            setError("Missing required information to create an alert.");
            return;
        }
        onCreate({
            dogName: dogProfile.name,
            dogImage: dogProfile.imageUrl,
            lastSeenLocation: location,
            date: new Date().toISOString(),
            status: 'active',
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Create Lost Dog Alert</h3>
                
                <div className="bg-slate-50 p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                        <img src={dogProfile.imageUrl} alt={dogProfile.name} className="w-20 h-20 rounded-full object-cover" />
                        <div>
                            <p className="text-sm text-slate-500">Alert for:</p>
                            <p className="text-2xl font-bold text-blue-600">{dogProfile.name}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold text-slate-700">Last Seen Location</h4>
                    <div className="bg-slate-50 p-3 mt-2 rounded-lg border text-sm">
                        {isFetchingLocation && <p className="text-slate-500">Getting current location...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {location && <p className="text-slate-700">Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</p>}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={!location || isFetchingLocation}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 disabled:bg-slate-400"
                    >
                        Post Alert
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAlertModal;
