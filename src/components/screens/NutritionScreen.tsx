import React, { useState, useEffect } from 'react';
import type { FeedingScheduleItem, WeightRecord } from '../../types';
import WeightChart from '../nutrition/WeightChart';

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

const NutritionScreen: React.FC = () => {
    const [schedule, setSchedule] = useState<FeedingScheduleItem[]>(() => {
        try { return JSON.parse(localStorage.getItem('paws-feeding-schedule') || '[]'); } catch { return []; }
    });
    const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(() => {
        try { return JSON.parse(localStorage.getItem('paws-weight-history') || '[]'); } catch { return []; }
    });

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<FeedingScheduleItem | null>(null);

    const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => { localStorage.setItem('paws-feeding-schedule', JSON.stringify(schedule)); }, [schedule]);
    useEffect(() => { localStorage.setItem('paws-weight-history', JSON.stringify(weightHistory)); }, [weightHistory]);

    // Schedule Handlers
    const handleSaveSchedule = (item: FeedingScheduleItem) => {
        if (editingSchedule) {
            setSchedule(s => s.map(i => i.id === item.id ? item : i));
        } else {
            setSchedule(s => [...s, { ...item, id: new Date().toISOString() }]);
        }
        closeScheduleModal();
    };
    const handleDeleteSchedule = (id: string) => {
        if (window.confirm('Delete this schedule item?')) {
            setSchedule(s => s.filter(i => i.id !== id));
        }
    };
    const openScheduleModal = (item: FeedingScheduleItem | null = null) => {
        setEditingSchedule(item);
        setIsScheduleModalOpen(true);
    };
    const closeScheduleModal = () => {
        setIsScheduleModalOpen(false);
        setEditingSchedule(null);
    };

    // Weight Handlers
    const handleAddWeight = () => {
        const newWeight = parseFloat(weight);
        if (newWeight > 0 && weightDate) {
            const newRecord: WeightRecord = { id: new Date().toISOString(), date: weightDate, weight: newWeight };
            setWeightHistory(wh => [...wh, newRecord].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
            setIsWeightModalOpen(false);
            setWeight('');
        }
    };
    const handleDeleteWeight = (id: string) => {
        if(window.confirm('Delete this weight entry?')) {
            setWeightHistory(wh => wh.filter(r => r.id !== id));
        }
    };

    const inputClasses = "w-full p-2 border rounded-md bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600";

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Nutrition Tracker</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Feeding Schedule Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">Feeding Schedule</h3>
                        <button onClick={() => openScheduleModal()} className="bg-blue-500 text-white font-bold text-sm py-1 px-3 rounded-full hover:bg-blue-600">+</button>
                    </div>
                    {schedule.length > 0 ? (
                        <ul className="space-y-3">
                            {schedule.sort((a,b) => a.time.localeCompare(b.time)).map(item => (
                                <li key={item.id} className="p-3 bg-slate-50 rounded-md border flex justify-between items-center">
                                    <div>
                                        <span className="font-bold text-blue-600 text-lg">{item.time}</span>
                                        <p className="text-slate-700">{item.food} - <span className="text-slate-500">{item.portion}</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openScheduleModal(item)} className="p-2 text-slate-400 hover:text-yellow-600"><EditIcon className="h-4 w-4"/></button>
                                        <button onClick={() => handleDeleteSchedule(item.id)} className="p-2 text-slate-400 hover:text-red-600"><TrashIcon className="h-4 w-4"/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-slate-500 text-center py-4">No feeding times set.</p>}
                </div>

                {/* Weight Tracking Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">Weight Tracking</h3>
                        <button onClick={() => setIsWeightModalOpen(true)} className="bg-blue-500 text-white font-bold text-sm py-1 px-3 rounded-full hover:bg-blue-600">+</button>
                    </div>
                    {weightHistory.length > 1 && <WeightChart data={weightHistory} />}
                    <ul className="space-y-2 mt-4 max-h-40 overflow-y-auto">
                        {weightHistory.map(r => (
                            <li key={r.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-md text-sm">
                                <span>{new Date(r.date).toLocaleDateString()}</span>
                                <span className="font-semibold">{r.weight} kg</span>
                                <button onClick={() => handleDeleteWeight(r.id)} className="p-1 text-slate-400 hover:text-red-600"><TrashIcon className="h-4 w-4"/></button>
                            </li>
                        ))}
                    </ul>
                    {weightHistory.length === 0 && <p className="text-slate-500 text-center py-4">No weight entries yet.</p>}
                </div>
            </div>

            {/* Modals */}
            {isScheduleModalOpen && <ScheduleModal onSave={handleSaveSchedule} onCancel={closeScheduleModal} item={editingSchedule} />}
            {isWeightModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsWeightModalOpen(false)}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">Log Weight</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Date</label>
                                <input type="date" value={weightDate} onChange={e => setWeightDate(e.target.value)} className={inputClasses} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Weight (kg)</label>
                                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g., 25.5" className={inputClasses} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsWeightModalOpen(false)} className="bg-slate-200 py-2 px-4 rounded-lg">Cancel</button>
                            <button onClick={handleAddWeight} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ScheduleModal: React.FC<{onSave: (item: FeedingScheduleItem) => void; onCancel: () => void; item: FeedingScheduleItem | null;}> = ({onSave, onCancel, item}) => {
    const [time, setTime] = useState(item?.time || '08:00');
    const [food, setFood] = useState(item?.food || '');
    const [portion, setPortion] = useState(item?.portion || '');

    const handleSave = () => {
        if(time && food && portion) {
            onSave({ id: item?.id || '', time, food, portion });
        }
    };

    const inputClasses = "w-full p-2 border rounded-md bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600";

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">{item ? 'Edit' : 'Add'} Feeding Time</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Food</label>
                        <input type="text" value={food} onChange={e => setFood(e.target.value)} placeholder="e.g., Kibble" className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Portion</label>
                        <input type="text" value={portion} onChange={e => setPortion(e.target.value)} placeholder="e.g., 1.5 cups" className={inputClasses} />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onCancel} className="bg-slate-200 py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NutritionScreen;