import React from 'react';
import type { ChatMessage } from '../../types';
import { useTheme } from '../context/ThemeContext';

interface MessageBubbleProps {
    message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const { currentTheme } = useTheme();
    const isMe = message.sender === 'me';
    
    return (
        <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={`max-w-xs md:max-w-md p-3 rounded-2xl animate-fade-in`}
                style={{
                    backgroundColor: isMe ? currentTheme.primary : currentTheme.card,
                    color: isMe ? currentTheme.primaryForeground : currentTheme.cardForeground,
                    border: `1px solid ${isMe ? currentTheme.primary : currentTheme.border}`,
                    borderBottomRightRadius: isMe ? '0.5rem' : '1rem',
                    borderBottomLeftRadius: isMe ? '1rem' : '0.5rem',
                }}
            >
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default MessageBubble;