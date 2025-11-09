import React, { useState, useRef, useEffect } from 'react';
import type { PlaydateMatch, PlaydateProfile } from '../../../types';
import MessageBubble from './MessageBubble';

interface ChatViewProps {
    match: PlaydateMatch;
    onBack: () => void;
    onSendMessage: (matchId: string, text: string) => void;
}


const ChatView: React.FC<ChatViewProps> = ({ match, onBack, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [match.messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(match.id, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="container mx-auto h-full flex flex-col bg-slate-50 dark:bg-slate-900" style={{ height: 'calc(100vh - 120px)'}}>
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-b dark:border-slate-700 p-3 flex items-center gap-3">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <img src={match.theirDogProfile.dogImage} alt={match.theirDogProfile.dogName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{match.theirDogProfile.dogName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">with {match.theirDogProfile.ownerName}</p>
                </div>
            </div>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {match.messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-t dark:border-slate-700 p-3 flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-full px-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                />
                <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full flex-shrink-0 hover:bg-blue-700 disabled:bg-slate-400" disabled={!newMessage.trim()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    );
};

export default ChatView;