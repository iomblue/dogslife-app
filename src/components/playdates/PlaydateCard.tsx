import React from 'react';
import type { PlaydateProfile } from '../../types';

interface PlaydateCardProps {
    profile: PlaydateProfile;
}

const PlaydateCard: React.FC<PlaydateCardProps> = ({ profile }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full border h-full flex flex-col transition-all duration-300`}>
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
        </div>
    );
};

export default PlaydateCard;
