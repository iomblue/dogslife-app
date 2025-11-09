import React from 'react';
import type { SymptomAnalysis, SymptomAnalysisHistoryItem } from '../../types';
import { UrgencyLevel } from '../../types';

interface AnalysisHistoryItemProps {
  item: SymptomAnalysisHistoryItem;
  onSelect: (analysis: SymptomAnalysis) => void;
}

const getUrgencyClasses = (urgency: UrgencyLevel): string => {
  switch (urgency) {
    case UrgencyLevel.URGENT:
      return 'border-red-500 bg-red-50 text-red-700';
    case UrgencyLevel.CONTACT_VET:
      return 'border-yellow-500 bg-yellow-50 text-yellow-700';
    case UrgencyLevel.MONITOR:
      return 'border-blue-500 bg-blue-50 text-blue-700';
    default:
      return 'border-slate-500 bg-slate-50 text-slate-700';
  }
};

const AnalysisHistoryItem: React.FC<AnalysisHistoryItemProps> = ({ item, onSelect }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${getUrgencyClasses(item.urgency)}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500">{item.date}</p>
          <p className="font-semibold text-slate-700 mt-1">Symptom Query:</p>
          <p className="text-slate-600 italic">"{item.symptoms}"</p>
        </div>
        <button
          onClick={() => onSelect(item)}
          className="bg-slate-200 text-slate-700 text-sm font-semibold py-1 px-3 rounded-lg hover:bg-slate-300 flex-shrink-0"
        >
          View
        </button>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-200">
        <p className="text-sm font-bold">Outcome: <span className="font-normal">{item.urgency}</span></p>
      </div>
    </div>
  );
};

export default AnalysisHistoryItem;
