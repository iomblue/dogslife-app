import React, { useState, useEffect } from 'react';
import type { Walk } from '../../types';

interface EditWalkModalProps {
    walk: Walk;
    onSave: (walk: Walk) => void;
    onCancel: () => void;
}

const secondsToHMS = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return { h, m, s };
};

const hmsToSeconds = (h: number, m: number, s: number) => {
    return (h * 3600) + (m * 60) + s;
};


const EditWalkModal: React.FC<EditWalkModalProps> = ({ walk, onSave, onCancel }) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState({ h: 0, m: 0, s: 0 });
    
    const inputClasses = "mt-1 block w-full pl-3 pr-2 py-2 text-base bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md";
    const durationInputClasses = "w-full p-2 text-center bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md";


    useEffect(() => {
        if (walk) {
            // Attempt to format date for input field
            try {
                 const walkDate = new Date(walk.date);
                 // Check if it's a valid date before trying to format
                 if (!isNaN(walkDate.getTime())) {
                     setDate(walkDate.toISOString().split('T')[0]);
                 } else {
                     // Fallback for non-standard date strings
                     setDate(new Date().toISOString().split('T')[0]);
                 }
            } catch (e) {
                 setDate(new Date().toISOString().split('T')[0]);
            }
            
            setDistance(walk.distance);
            setDuration(secondsToHMS(walk.duration));
        }
    }, [walk]);

    const handleSave = () => {
        const totalSeconds = hmsToSeconds(duration.h, duration.m, duration.s);
        const updatedWalk: Walk = {
            ...walk,
            date: new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
            distance: Number(distance),
            duration: totalSeconds,
        };
        onSave(updatedWalk);
    };

    const handleDurationChange = (part: 'h' | 'm' | 's', value: string) => {
        const numValue = parseInt(value, 10) || 0;
        setDuration(prev => ({ ...prev, [part]: numValue }));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">Edit Walk</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="walk-date" className="block text-sm font-medium text-slate-700">Date</label>
                            <input
                                type="date"
                                id="walk-date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label htmlFor="walk-distance" className="block text-sm font-medium text-slate-700">Distance (km)</label>
                             <input
                                type="number"
                                id="walk-distance"
                                value={distance}
                                onChange={(e) => setDistance(parseFloat(e.target.value))}
                                step="0.01"
                                className={inputClasses}
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700">Duration</label>
                             <div className="grid grid-cols-3 gap-2 mt-1">
                                <input type="number" value={duration.h} onChange={e => handleDurationChange('h', e.target.value)} placeholder="H" className={durationInputClasses} />
                                <input type="number" value={duration.m} onChange={e => handleDurationChange('m', e.target.value)} placeholder="M" className={durationInputClasses} />
                                <input type="number" value={duration.s} onChange={e => handleDurationChange('s', e.target.value)} placeholder="S" className={durationInputClasses} />
                             </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                    <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditWalkModal;