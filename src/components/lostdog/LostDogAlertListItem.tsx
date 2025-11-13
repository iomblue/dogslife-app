import React, { useState } from 'react';
import type { LostDogAlert } from '../../types';
import AlertsMapView from './AlertsMapView';

interface LostDogAlertListItemProps {
    alert: LostDogAlert;
    onMarkAsFound: (alertId: string) => void;
}

const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        const years = Math.floor(interval);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        const months = Math.floor(interval);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
}


const LostDogAlertListItem: React.FC<LostDogAlertListItemProps> = ({ alert, onMarkAsFound }) => {
    const isFound = alert.status === 'found';
    const [showMap, setShowMap] = useState(false);
    
    return (
        <div className={`bg-white p-4 rounded-lg shadow border flex flex-col sm:flex-row sm:items-center gap-4 ${isFound ? 'opacity-60 bg-slate-50' : ''}`}>
            <img src={alert.dogImage} alt={alert.dogName} className="w-24 h-24 sm:w-20 sm:h-20 rounded-lg object-cover self-center sm:self-start" />
            <div className="flex-grow">
                <p className="font-bold text-xl text-slate-800">{alert.dogName}</p>
                <p className={`text-sm font-semibold ${isFound ? 'text-green-600' : 'text-red-600'}`}>
                    {isFound ? 'Found!' : `Lost ${timeSince(alert.date)}`}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    Last seen near Lat: {alert.lastSeenLocation.lat.toFixed(3)}, Lng: {alert.lastSeenLocation.lng.toFixed(3)}
                </p>
                 <button onClick={() => setShowMap(!showMap)} className="text-xs text-blue-500 mt-1">
                    {showMap ? 'Hide Map' : 'Show Map'}
                </button>
                {showMap && <div className="mt-2"><AlertsMapView alerts={[alert]} /></div>}
            </div>
            {isFound ? (
                 <div className="bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg text-sm text-center">
                    Reunited
                </div>
            ) : (
                <button 
                    onClick={() => onMarkAsFound(alert.id)}
                    className="bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg hover:bg-green-200 text-sm"
                >
                    Mark as Found
                </button>
            )}
        </div>
    );
};

export default LostDogAlertListItem;
