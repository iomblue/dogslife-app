

import React from 'react';
import type { SymptomAnalysis } from '../types';
import { UrgencyLevel } from '../types';

interface ResultDisplayProps {
  analysis: SymptomAnalysis;
}

const getUrgencyClasses = (urgency: UrgencyLevel): string => {
  switch (urgency) {
    case UrgencyLevel.URGENT:
      return 'bg-red-100 border-red-500 text-red-800';
    case UrgencyLevel.CONTACT_VET:
      return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    case UrgencyLevel.MONITOR:
      return 'bg-blue-100 border-blue-500 text-blue-800';
    default:
      return 'bg-slate-100 border-slate-500 text-slate-800';
  }
};

const UrgencyBadge: React.FC<{ urgency: UrgencyLevel }> = ({ urgency }) => {
  const urgencyClasses = getUrgencyClasses(urgency);
  return (
    <div className={`p-4 rounded-lg border-l-4 ${urgencyClasses} mb-6`}>
      <h2 className="text-xl font-bold">Urgency Level:</h2>
      <p className="text-lg">{urgency}</p>
    </div>
  );
};

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <UrgencyBadge urgency={analysis.urgency} />
      
      <div className="bg-white p-4 border border-slate-200 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Potential Causes</h3>
        <ul className="list-none space-y-2">
          {analysis.potentialCauses.map((cause, index) => (
            <li key={index} className="flex items-start text-slate-600">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 border border-slate-200 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Red Flags to Watch For</h3>
        <ul className="list-none space-y-2">
          {analysis.redFlags.map((flag, index) => (
            <li key={index} className="flex items-start text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5">
                    <polygon points="12 2 1 21 23 21 12 2"></polygon>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>

      {analysis.clarifyingQuestions && analysis.clarifyingQuestions.length > 0 && (
         <div className="bg-white p-4 border border-slate-200 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Further Questions</h3>
             <p className="text-sm text-slate-500 mb-3">Providing answers to these questions can help your vet. </p>
            <ul className="list-none space-y-2">
              {analysis.clarifyingQuestions.map((question, index) => (
                <li key={index} className="flex items-start text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
      )}

    </div>
  );
};

export default ResultDisplay;
