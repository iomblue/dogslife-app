import React from 'react';
import type { SymptomAnalysis } from '../types';
import { UrgencyLevel } from '../types';

interface ResultDisplayProps {
  analysis: SymptomAnalysis;
}

const getUrgencyClass = (urgency: UrgencyLevel) => {
  switch (urgency) {
    case UrgencyLevel.URGENT:
      return 'bg-red-100 border-red-500 text-red-700';
    case UrgencyLevel.CONTACT_VET:
      return 'bg-yellow-100 border-yellow-500 text-yellow-700';
    default:
      return 'bg-blue-100 border-blue-500 text-blue-700';
  }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border animate-fade-in">
      <div className={`p-4 rounded-lg border ${getUrgencyClass(analysis.urgency)}`}>
        <h3 className="font-bold text-lg">Urgency Level</h3>
        <p>{analysis.urgency}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg text-slate-800">Potential Causes</h3>
        <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
          {analysis.potentialCauses.map((cause, i) => <li key={i}>{cause}</li>)}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg text-slate-800">Red Flags to Watch For</h3>
        <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
          {analysis.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}
        </ul>
      </div>
      
      <div className="mt-6">
        <h3 className="font-bold text-lg text-slate-800">Clarifying Questions a Vet Might Ask</h3>
        <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
          {analysis.clarifyingQuestions.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default ResultDisplay;
