import React from 'react';
import type { PlaydateMatch } from '../../types';

interface MatchListProps {
    matches: PlaydateMatch[];
    onSelectMatch: (match: PlaydateMatch) => void;
}

const MatchList: React.FC<MatchListProps> = ({ matches, onSelectMatch }) => {
    
    const sortedMatches = [...matches].sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
            <h3 className="font-bold text-slate-800 mb-2">Your Chats</h3>
            {sortedMatches.length > 0 ? (
                 <div className="space-y-3">
                    {sortedMatches.map(match => {
                        const lastMessage = match.messages[match.messages.length - 1];
                        return (
                            <button key={match.id} onClick={() => onSelectMatch(match)} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 flex items-center gap-3">
                                <img src={match.theirDogProfile.dogImage} alt={match.theirDogProfile.dogName} className="w-12 h-12 rounded-full object-cover" />
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold">{match.theirDogProfile.dogName}</p>
                                    <p className="text-sm text-slate-500 truncate">{lastMessage ? `${lastMessage.sender === 'me' ? 'You: ' : ''}${lastMessage.text}` : 'You matched! Say hello.'}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-slate-500 text-center py-4">No matches yet. Keep swiping!</p>
            )}
        </div>
    );
};

export default MatchList;
