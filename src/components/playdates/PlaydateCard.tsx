import React from 'react';
import type { PlaydateProfile } from '../../types';

interface PlaydateCardProps {
    profile: PlaydateProfile;
    onLike: () => void;
    onPass: () => void;
    onShowOwner: () => void;
    isTop: boolean;
}

const PlaydateCard: React.FC<PlaydateCardProps> = ({ profile, onLike, onPass, onShowOwner, isTop }) => {
    return (
        <div 
            className={`bg-white rounded-2xl shadow-xl overflow-hidden absolute w-full border h-full flex flex-col transition-all duration-300`}
            style={{
                transform: `scale(${1 - (isTop ? 0 : 0.05)})`,
                opacity: isTop ? 1 : 0,
                zIndex: isTop ? 10 : 0,
            }}
        >
            <div className="relative w-full h-full">
                <img src={profile.dogImage} alt={profile.dogName} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                    <h3 className="text-3xl font-bold">{profile.dogName}, {profile.age}</h3>
                    <p className="text-lg">{profile.breed}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile.temperament.map(t => <span key={t} className="text-xs bg-white/30 rounded-full px-2 py-1">{t}</span>)}
                    </div>
                </div>
            </div>
            {isTop && (
                <div className="flex justify-around p-4 bg-white">
                    <button onClick={onPass} className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <button onClick={onShowOwner} className="p-4 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </button>
                    <button onClick={onLike} className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PlaydateCard;
