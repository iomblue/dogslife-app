import React from 'react';

interface DisclaimerModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-bold mb-4 text-yellow-600">Important Disclaimer</h3>
        <p className="text-slate-600 mb-4">
          The Symptom Checker is an AI-powered tool for informational purposes only. It is not a substitute for professional veterinary advice, diagnosis, or treatment.
        </p>
        <p className="text-slate-600 mb-6">
          Always consult a qualified veterinarian for any health concerns regarding your pet. Never disregard or delay seeking professional advice because of something you have read here.
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
          <button onClick={onConfirm} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">I Understand, Continue</button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
