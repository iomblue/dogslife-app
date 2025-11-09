import React from 'react';
import type { SymptomAnalysis } from '../../types';
import ResultDisplay from '../ResultDisplay';

interface AnalysisDetailModalProps {
  analysis: SymptomAnalysis | null;
  onClose: () => void;
}

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const AnalysisDetailModal: React.FC<AnalysisDetailModalProps> = ({ analysis, onClose }) => {
  if (!analysis) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-50 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 sticky top-0 bg-slate-50 border-b z-10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Analysis Details</h3>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
            <ResultDisplay analysis={analysis} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailModal;
