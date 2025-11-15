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
        replies: [],
    },
    {
        id: '2',
        author: 'Mia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        timestamp: '1 day ago',
        content: 'Has anyone tried the new organic dog food from Pet Pantry? My little guy is a picky eater and I am looking for recommendations.',
        location: 'Downtown',
        replies: [
            {
                id: '3',
                author: 'Sam',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
                timestamp: '20 hours ago',
                content: 'We use the salmon and sweet potato one, and our dog loves it!',
                location: 'Downtown',
                replies: [],
            }
        ]
    },
];

const PostCard: React.FC<{ post: CommunityPost, onReply: (postId: string, content: string) => void }> = ({ post, onReply }) => {
    const [showReply, setShowReply] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyContent.trim()) {
            onReply(post.id, replyContent);
            setReplyContent('');
            setShowReply(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="flex items-start">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <span className="font-bold">{post.author}</span>
                        <span className="text-sm text-slate-500">{post.timestamp}</span>
                    </div>
                    <p className="mt-2">{post.content}</p>
                    <div className="text-xs text-slate-400 mt-2">{post.location}</div>
                    <button onClick={() => setShowReply(!showReply)} className="text-sm text-blue-600 mt-2">Reply</button>
                    {showReply && (
                        <form onSubmit={handleReplySubmit} className="mt-2">
                            <textarea 
                                value={replyContent} 
                                onChange={e => setReplyContent(e.target.value)} 
                                className="w-full p-2 border rounded-md"
                                placeholder="Write a reply..."
                            />
                            <button type="submit" className="bg-blue-600 text-white font-bold py-1 px-3 rounded-lg mt-1">Submit</button>
                        </form>
                    )}
                </div>
            </div>
            {post.replies && post.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4 border-l-2 pl-4">
                    {post.replies.map(reply => <PostCard key={reply.id} post={reply} onReply={onReply} />)}
                </div>
            )}
        </div>
    );
}

const CommunityScreen: React.FC = () => {
    const [posts, setPosts] = useState<CommunityPost[]>(MOCK_POSTS);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPostContent.trim()) {
            const newPost: CommunityPost = {
                id: Date.now().toString(),
                author: 'Me', // Assuming current user
                avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100', // Placeholder
                timestamp: 'Just now',
                content: newPostContent,
                location: 'Your Location', // Placeholder
                replies: [],
            };
            setPosts(prev => [newPost, ...prev]);
            setNewPostContent('');
            setIsCreatingPost(false);
        }
    };

    const handleReply = (postId: string, content: string) => {
        const newReply: CommunityPost = {
            id: Date.now().toString(),
            author: 'Me', // Assuming current user
            avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100', // Placeholder
            timestamp: 'Just now',
            content,
            location: 'Your Location', // Placeholder
            replies: [],
        };

        const addReplyToPost = (posts: CommunityPost[], targetId: string): CommunityPost[] => {
            return posts.map(post => {
                if (post.id === targetId) {
                    return { ...post, replies: [...post.replies, newReply] };
                }
                if (post.replies.length > 0) {
                    return { ...post, replies: addReplyToPost(post.replies, targetId) };
                }
                return post;
            });
        };
        setPosts(prev => addReplyToPost(prev, postId));
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800">Community Board</h2>
                    <button onClick={() => setIsCreatingPost(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Create Post</button>
                </div>

                {isCreatingPost && (
                     <form onSubmit={handleCreatePost} className="bg-white p-4 rounded-lg shadow-md border mb-6">
                        <textarea 
                            value={newPostContent} 
                            onChange={e => setNewPostContent(e.target.value)} 
                            className="w-full p-2 border rounded-md"
                            placeholder="What's on your mind?"
                        />
                        <div className="flex justify-end mt-2">
                            <button type="button" onClick={() => setIsCreatingPost(false)} className="text-slate-600 mr-2">Cancel</button>
                            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Post</button>
                        </div>
                    </form>
                )}

                <div className="space-y-4">
                    {posts.map(post => <PostCard key={post.id} post={post} onReply={handleReply} />)}
                </div>
            </div>
        </div>
    );
};

export default CommunityScreen;
