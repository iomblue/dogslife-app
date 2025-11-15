import React, { useState, useEffect } from 'react';
import type { OwnerProfile, Screen } from '../../types';

interface OwnerProfileScreenProps {
    setActiveScreen: (screen: Screen) => void;
}

const OwnerProfileScreen: React.FC<OwnerProfileScreenProps> = ({ setActiveScreen }) => {
    const [profile, setProfile] = useState<OwnerProfile | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const inputClasses = "mt-1 block w-full p-2 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md";

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem('paws-owner-profile');
            if (savedProfile) {
                const parsedProfile = JSON.parse(savedProfile);
                if (parsedProfile.name) {
                    setProfile(parsedProfile);
                    setIsEditing(false);
                } else {
                    setProfile({ name: '', town: '', photoUrl: '' });
                    setIsEditing(true); // No name, force edit mode.
                }
            } else {
                setProfile({ name: '', town: '', photoUrl: '' });
                setIsEditing(true); // No saved profile, start in edit mode.
            }
        } catch (e) {
            console.error("Failed to load profile", e);
            setProfile({ name: '', town: '', photoUrl: '' });
            setIsEditing(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev!, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(prev => ({ ...prev!, photoUrl: event.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (profile && profile.name && profile.town) {
            localStorage.setItem('paws-owner-profile', JSON.stringify(profile));
            setIsEditing(false);
            alert('Profile saved successfully!');
        } else {
            alert('Please fill out all required fields.');
        }
    };

    if (!isEditing && profile) {
        return (
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-slate-800">My Profile</h2>
                        <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                            Edit
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                         <img 
                            src={profile.photoUrl || 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop'} 
                            alt={profile.name}
                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-300"
                        />
                        <div className="flex-grow">
                             <p className="text-4xl font-bold text-blue-600">{profile.name}</p>
                             <p className="text-lg text-slate-700">{profile.town}</p>
                             <button onClick={() => setActiveScreen('Profile')} className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                                My Dogs
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md border space-y-6">
                    <h2 className="text-3xl font-bold text-slate-800">Edit My Profile</h2>
                     <div className="flex flex-col items-center gap-4">
                        <img 
                            src={profile?.photoUrl || 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop'}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            id="imageUpload"
                            className="hidden"
                        />
                        <label htmlFor="imageUpload" className="cursor-pointer bg-slate-100 text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 text-sm">
                            Upload Photo
                        </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                            <input type="text" name="name" id="name" value={profile?.name || ''} onChange={handleInputChange} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="town" className="block text-sm font-medium text-slate-700">Town</label>
                            <input type="text" name="town" id="town" value={profile?.town || ''} onChange={handleInputChange} required className={inputClasses} />
                        </div>
                    </div>
                     <div className="flex justify-end gap-4 pt-4 border-t">
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OwnerProfileScreen;
