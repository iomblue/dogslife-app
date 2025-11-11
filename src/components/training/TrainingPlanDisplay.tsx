import React from 'react';
import type { TrainingPlan } from '../../types';

interface TrainingPlanDisplayProps {
  plan: TrainingPlan;
}

const TrainingPlanDisplay: React.FC<TrainingPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-800">{plan.goal}</h3>
      <p className="text-slate-500 mb-4">Duration: {plan.duration}</p>
      <div className="space-y-4">
        {plan.steps.map((step, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-lg border">
            <h4 className="font-semibold text-blue-600">{step.title}</h4>
            <p className="text-slate-600 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPlanDisplay;
