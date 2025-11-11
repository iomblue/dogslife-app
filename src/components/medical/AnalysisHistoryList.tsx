import React from 'react';
import type { SymptomAnalysisHistoryItem } from '../../types';

interface AnalysisHistoryListProps {
  history: SymptomAnalysisHistoryItem[];
  onSelect: (item: SymptomAnalysisHistoryItem) => void;
}

const AnalysisHistoryList: React.FC<AnalysisHistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return <div className="text-center text-slate-500 bg-slate-50 p-4 rounded-lg border">No analysis history.</div>;
  }

  return (
    <div className="space-y-3">
      {history.map(item => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full text-left bg-white p-4 rounded-lg shadow border hover:bg-slate-50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-slate-700 truncate">{item.symptoms}</p>
            <p className="text-sm text-slate-400 flex-shrink-0 ml-4">{item.date}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnalysisHistoryList;
