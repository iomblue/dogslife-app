import React, { useState, useEffect } from 'react';
import type { JournalEntry } from '../../types';

const JournalScreen: React.FC = () => {
    const [entries, setEntries] = useState<JournalEntry[]>(() => {
        try {
            const savedEntries = localStorage.getItem('paws-journal');
            return savedEntries ? JSON.parse(savedEntries) : [];
        } catch (e) {
            console.error("Failed to parse journal entries from localStorage", e);
            return [];
        }
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImage, setNewImage] = useState<string | null>(null);
    const [newCaption, setNewCaption] = useState('');

    useEffect(() => {
        localStorage.setItem('paws-journal', JSON.stringify(entries));
    }, [entries]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    setNewImage(e.target.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSaveEntry = () => {
        if (newImage && newCaption.trim()) {
            const newEntry: JournalEntry = {
                id: new Date().toISOString(),
                date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
                imageUrl: newImage,
                caption: newCaption
            };
            setEntries(prevEntries => [newEntry, ...prevEntries]);
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewImage(null);
        setNewCaption('');
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Photo Journal</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Memory
                </button>
            </div>

            {entries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {entries.map(entry => (
                        <div key={entry.id} className="bg-white rounded-lg shadow border overflow-hidden group">
                            <img src={entry.imageUrl} alt={entry.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                            <div className="p-4">
                                <p className="text-sm text-slate-600 truncate">{entry.caption}</p>
                                <p className="text-xs text-slate-400 mt-1">{entry.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-20 bg-white rounded-lg border">
                    <p className="text-slate-500">Your photo journal is empty.</p>
                    <p className="text-sm text-slate-400">Click "Add Memory" to save your first photo.</p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in">
                        <h3 className="text-2xl font-bold mb-4">New Memory</h3>
                        <div className="space-y-4">
                            <input type="file" accept="image/*" onChange={handleImageSelect} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                            {newImage && <img src={newImage} alt="Preview" className="w-full h-48 object-contain rounded-lg bg-slate-100" />}
                            <textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Add a caption..." className="w-full p-2 border rounded-lg h-24 bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"/>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={closeModal} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
                            <button onClick={handleSaveEntry} disabled={!newImage || !newCaption.trim()} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-300">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JournalScreen;
