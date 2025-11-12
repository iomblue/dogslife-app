import React, { useState, useEffect } from 'react';
import type { PlaydateProfile, PlaydateMatch, ChatMessage, DogProfile } from '../../types';
import { DogSize, Temperament, PlayStyle } from '../../types';

import FilterControls from '../playdates/FilterControls';
import PlaydateCard from '../playdates/PlaydateCard';
import MatchModal from '../playdates/MatchModal';
import MatchList from '../playdates/MatchList';
import ChatView from '../playdates/ChatView';

const MOCK_PROFILES: PlaydateProfile[] = [
  { id: '1', dogName: 'Buddy', dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400', breed: 'Golden Retriever', age: 3, size: DogSize.LARGE, temperament: [Temperament.FRIENDLY, Temperament.CALM], playStyle: PlayStyle.GENTLE, ownerName: 'Alex', ownerImage: '' },
  { id: '2', dogName: 'Lucy', dogImage: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400', breed: 'Poodle', age: 2, size: DogSize.MEDIUM, temperament: [Temperament.ENERGETIC], playStyle: PlayStyle.CHASER, ownerName: 'Mia', ownerImage: '' },
  { id: '3', dogName: 'Max', dogImage: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=400', breed: 'Beagle', age: 5, size: DogSize.MEDIUM, temperament: [Temperament.CALM], playStyle: PlayStyle.WRESTLER, ownerName: 'Sam', ownerImage: '' },
];

const PlaydateScreen: React.FC = () => {
    type View = 'find' | 'chats';
    const [view, setView] = useState<View>('find');

    const [profiles, setProfiles] = useState<PlaydateProfile[]>(MOCK_PROFILES);
    const [matches, setMatches] = useState<PlaydateMatch[]>(() => {
        try { return JSON.parse(localStorage.getItem('paws-playdate-matches') || '[]'); } catch { return []; }
    });
    const [myDogProfile, setMyDogProfile] = useState<PlaydateProfile | null>(null);

    const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
    const [lastMatch, setLastMatch] = useState<PlaydateProfile | null>(null);
    const [activeChat, setActiveChat] = useState<PlaydateMatch | null>(null);

    useEffect(() => {
        const savedProfile: DogProfile | null = JSON.parse(localStorage.getItem('paws-dog-profile') || 'null');
        if (savedProfile) {
            setMyDogProfile({
                id: 'my-dog',
                dogName: savedProfile.name,
                dogImage: savedProfile.imageUrl,
                breed: savedProfile.breed,
                age: 4, // Placeholder age
                size: DogSize.MEDIUM, // Placeholder
                temperament: [Temperament.FRIENDLY], // Placeholder
                playStyle: PlayStyle.GENTLE, // Placeholder
                ownerName: 'Me',
                ownerImage: '',
            });
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('paws-playdate-matches', JSON.stringify(matches));
    }, [matches]);

    const handleLike = () => {
        if (profiles.length === 0 || !myDogProfile) return;

        const likedProfile = profiles[0];
        setProfiles(prev => prev.slice(1));

        // Simulate a match
        if (Math.random() > 0.3) {
            setLastMatch(likedProfile);
            setIsMatchModalOpen(true);
            const newMatch: PlaydateMatch = {
                id: `match_${myDogProfile.id}_${likedProfile.id}`,
                myDogProfile,
                theirDogProfile: likedProfile,
                messages: [],
                lastMessageTimestamp: Date.now(),
            };
            setMatches(prev => {
                if (prev.find(m => m.id === newMatch.id)) return prev;
                return [newMatch, ...prev];
            });
        }
    };

    const handleSendMessage = (matchId: string, text: string) => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            text,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const updatedMatches = matches.map(m =>
            m.id === matchId ? { ...m, messages: [...m.messages, newMessage], lastMessageTimestamp: Date.now() } : m
        );
        
        const currentMatch = updatedMatches.find(m => m.id === matchId);
        
        if (currentMatch) {
            // Simulate a reply
            setTimeout(() => {
                const replyMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    text: 'That sounds great! What time works?',
                    sender: 'them',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMatches(prev => prev.map(m =>
                    m.id === matchId ? { ...m, messages: [...m.messages, replyMessage], lastMessageTimestamp: Date.now() + 1 } : m
                ));
            }, 1500);
        }
        
        setMatches(updatedMatches);
    };

    useEffect(() => {
        if(activeChat) {
            const updatedChat = matches.find(m => m.id === activeChat.id);
            if(updatedChat) {
                setActiveChat(updatedChat);
            }
        }
    }, [matches, activeChat]);


    if (activeChat) {
        return <ChatView
            match={activeChat}
            onBack={() => setActiveChat(null)}
            onSendMessage={handleSendMessage}
        />;
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-md mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 text-center">Find a Playmate</h2>
                
                {/* Tabs */}
                <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button onClick={() => setView('find')} className={`w-full py-2 rounded-md font-semibold ${view === 'find' ? 'bg-white shadow' : ''}`}>Find</button>
                    <button onClick={() => setView('chats')} className={`w-full py-2 rounded-md font-semibold ${view === 'chats' ? 'bg-white shadow' : ''}`}>Chats</button>
                </div>

                {view === 'find' && (
                    <>
                        <FilterControls />
                        {profiles.length > 0 && myDogProfile ? (
                            <PlaydateCard
                                profile={profiles[0]}
                                onLike={handleLike}
                                onPass={() => setProfiles(prev => prev.slice(1))}
                            />
                        ) : (
                            <div className="text-center p-8 bg-white rounded-lg border h-96 flex flex-col justify-center">
                                { !myDogProfile ? (
                                     <p>Please create a dog profile to start matching!</p>
                                ) : (
                                     <p>No more profiles nearby. Check back later!</p>
                                )}
                            </div>
                        )}
                    </>
                )}

                {view === 'chats' && (
                    <MatchList matches={matches} onSelectMatch={setActiveChat} />
                )}

                {isMatchModalOpen && lastMatch && myDogProfile && (
                    <MatchModal
                        yourDogImage={myDogProfile.dogImage}
                        theirDogImage={lastMatch.dogImage}
                        theirDogName={lastMatch.dogName}
                        onClose={() => setIsMatchModalOpen(false)}
                        onStartChat={() => {
                            const match = matches.find(m => m.theirDogProfile.id === lastMatch.id);
                            if (match) setActiveChat(match);
                            setIsMatchModalOpen(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaydateScreen;
