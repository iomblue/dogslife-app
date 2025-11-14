import React from 'react';
import type { OwnerProfile } from '../../types';

interface OwnerProfileModalProps {
  owner: OwnerProfile;
  onClose: () => void;
}

const OwnerProfileModal: React.FC<OwnerProfileModalProps> = ({ owner, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center">
            <img src={owner.photoUrl} alt={owner.name} className="w-32 h-32 rounded-full object-cover border-4 border-slate-200" />
            <h3 className="text-2xl font-bold mt-4">{owner.name}</h3>
            <p className="text-slate-500">{owner.town}</p>
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Close</button>
      </div>
    </div>
  );
};

export default OwnerProfileModal;
