import React from 'react';
import type { SymptomAnalysis, SymptomAnalysisHistoryItem } from '../../types';
import AnalysisHistoryItem from './AnalysisHistoryItem';

interface AnalysisHistoryListProps {
  history: SymptomAnalysisHistoryItem[];
  onSelect: (analysis: SymptomAnalysis) => void;
}

const AnalysisHistoryList: React.FC<AnalysisHistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg border">
        <p className="text-slate-500">No past analyses found.</p>
        <p className="text-sm text-slate-400 mt-1">Your symptom check history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map(item => (
        <AnalysisHistoryItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default AnalysisHistoryList;
