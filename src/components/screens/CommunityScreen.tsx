import React, { useState, useEffect } from 'react';
import type { CommunityPost } from '../../types';
import { MOCK_USERS } from '../../constants';

const defaultPosts: CommunityPost[] = [
    { id: '1', author: 'GoldenRetrieverLover', avatarUrl: MOCK_USERS[0].avatar, date: 'Yesterday', text: 'Does anyone have recommendations for durable chew toys? My golden goes through them so fast!' },
    { id: '2', author: 'PoodlePal', avatarUrl: MOCK_USERS[1].avatar, date: '2 days ago', text: 'Just discovered the best dog park in the area! So much space to run around.' },
];

const CommunityScreen: React.FC = () => {
    const [posts, setPosts] = useState<CommunityPost[]>(() => {
        try {
            const savedPosts = localStorage.getItem('paws-community');
            return savedPosts ? JSON.parse(savedPosts) : defaultPosts;
        } catch (e) {
            console.error("Failed to parse community posts from localStorage", e);
            return defaultPosts;
        }
    });

    const [newPostText, setNewPostText] = useState('');

    useEffect(() => {
        localStorage.setItem('paws-community', JSON.stringify(posts));
    }, [posts]);

    const handleCreatePost = () => {
        if (newPostText.trim()) {
            const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
            const newPost: CommunityPost = {
                id: new Date().toISOString(),
                author: 'You (as ' + randomUser.name + ')',
                avatarUrl: randomUser.avatar,
                date: 'Just now',
                text: newPostText,
            };
            setPosts(prevPosts => [newPost, ...prevPosts]);
            setNewPostText('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Community Feed</h2>
                
                <div className="bg-white p-4 rounded-lg shadow-md border mb-8">
                    <textarea 
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder="Share something with the community..."
                        className="w-full p-2 border rounded-lg h-20 bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
                    />
                    <div className="flex justify-end mt-2">
                        <button onClick={handleCreatePost} disabled={!newPostText.trim()} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-300">
                            Post
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border animate-fade-in">
                            <div className="flex items-start">
                                <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full object-cover mr-4"/>
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-slate-800">{post.author}</p>
                                        <p className="text-xs text-slate-400">{post.date}</p>
                                    </div>
                                    <p className="text-slate-700 mt-2">{post.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityScreen;
