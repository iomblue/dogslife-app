import React from 'react';

interface MatchModalProps {
    yourDogImage: string;
    theirDogImage: string;
    theirDogName: string;
    onClose: () => void;
    onStartChat: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ yourDogImage, theirDogImage, theirDogName, onClose, onStartChat }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl text-center p-8 max-w-sm w-full animate-fade-in scale-100" onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-bold text-pink-500">It's a Match!</h2>
                <p className="text-slate-600 mt-2">You and {theirDogName} have liked each other.</p>

                <div className="flex justify-center items-center my-6 space-x-[-2rem]">
                    <img src={yourDogImage || 'https://images.unsplash.com/photo-1596492784533-24103a733aff?w=200'} alt="Your dog" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                    <img src={theirDogImage} alt={theirDogName} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                </div>
                
                <div className="space-y-3">
                     <button onClick={onStartChat} className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-600">
                        Start Chat
                    </button>
                    <button onClick={onClose} className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300">
                        Keep Swiping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchModal;