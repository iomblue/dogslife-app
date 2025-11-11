import React from 'react';
import type { SymptomAnalysis } from '../../types';
import ResultDisplay from '../ResultDisplay';

interface AnalysisDetailModalProps {
  analysis: SymptomAnalysis;
  onClose: () => void;
}

const AnalysisDetailModal: React.FC<AnalysisDetailModalProps> = ({ analysis, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Analysis Details</h3>
          <ResultDisplay analysis={analysis} />
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end rounded-b-lg">
            <button onClick={onClose} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailModal;
