import React, { useState, useRef } from 'react';
import type { PlaydateProfile } from '../../types';

interface PlaydateCardProps {
    profile: PlaydateProfile;
    onLike: () => void;
    onPass: () => void;
    isTop: boolean;
}

const PlaydateCard: React.FC<PlaydateCardProps> = ({ profile, onLike, onPass, isTop }) => {
    const [translateX, setTranslateX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDragStart = () => {
        if (!isTop) return;
        setIsDragging(true);
    };

    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !isTop) return;

        let currentX;
        if ('touches' in e) {
            currentX = e.touches[0].clientX;
        } else {
            currentX = e.clientX;
        }

        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            const startX = rect.left + rect.width / 2;
            const deltaX = currentX - startX;
            setTranslateX(deltaX);
        }
    };

    const handleDragEnd = () => {
        if (!isDragging || !isTop) return;

        if (translateX > 100) {
            onLike();
        } else if (translateX < -100) {
            onPass();
        }
        
        setTranslateX(0);
        setIsDragging(false);
    };

    const rotation = translateX / 20;

    return (
        <div
            ref={cardRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDrag}
            onTouchEnd={handleDragEnd}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden absolute w-full h-full transition-transform duration-200 ${isDragging ? '' : 'ease-out'}`}
            style={{ transform: `translateX(${translateX}px) rotate(${rotation}deg)` }}
        >
            <img src={profile.dogImage} alt={profile.dogName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex justify-between items-center px-4">
                <div className="text-2xl font-bold text-red-400 border-4 border-red-400 p-2 rounded-lg rotate-45 opacity-0 transition-opacity" style={{ opacity: translateX < -50 ? 1 : 0 }}>NOPE</div>
                <div className="text-2xl font-bold text-green-400 border-4 border-green-400 p-2 rounded-lg -rotate-45 opacity-0 transition-opacity" style={{ opacity: translateX > 50 ? 1 : 0 }}>LIKE</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-3xl font-bold">{profile.dogName}, {profile.age}</h3>
                <p className="text-lg">{profile.breed}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {profile.temperament.map(t => <span key={t} className="text-xs bg-white/30 rounded-full px-2 py-1">{t}</span>)}
                </div>
            </div>
        </div>
    );
};

export default PlaydateCard;
