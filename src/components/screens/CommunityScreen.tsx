import React, { useState } from 'react';
import type { CommunityPost } from '../../types';

const MOCK_POSTS: CommunityPost[] = [
    {
        id: '1',
        author: 'Alex',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        timestamp: '2 hours ago',
        content: 'Just a heads up, the dog park on Elm Street is closed for maintenance today. Looks like they are resodding the main area.',
        location: 'Elm Street Park',
    },
    {
        id: '2',
        author: 'Mia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        timestamp: '1 day ago',
        content: 'Has anyone tried the new organic dog food from Pet Pantry? My little guy is a picky eater and I am looking for recommendations.',
        location: 'Downtown',
    },
];

const CommunityScreen: React.FC = () => {
    const [posts] = useState<CommunityPost[]>(MOCK_POSTS);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Community Board</h2>
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border">
                            <div className="flex items-start">
                                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{post.author}</span>
                                        <span className="text-sm text-slate-500">{post.timestamp}</span>
                                    </div>
                                    <p className="mt-2">{post.content}</p>
                                    <div className="text-xs text-slate-400 mt-2">{post.location}</div>
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
