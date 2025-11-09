import React from 'react';
import Disclaimer from '../Disclaimer';

interface DisclaimerModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" 
          onClick={onCancel}
        >
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-lg" 
              onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <Disclaimer />
                    <p className="text-sm text-slate-600 mt-4">
                        By clicking "Agree & Continue", you acknowledge that you have read and understood this disclaimer and agree to its terms.
                    </p>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                    <button onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Agree & Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;
