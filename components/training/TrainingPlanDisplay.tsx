import React from 'react';
import type { TrainingPlan } from '../../types';

interface TrainingPlanDisplayProps {
    plan: TrainingPlan;
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);


const TrainingPlanDisplay: React.FC<TrainingPlanDisplayProps> = ({ plan }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border animate-fade-in space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-blue-600 capitalize">{plan.goal}</h2>
                <p className="font-semibold text-slate-500">{plan.duration}</p>
            </div>
            <div className="space-y-4">
                {plan.steps.map((step, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <CheckIcon className="h-5 w-5 text-green-500" />
                            {step.title}
                        </h3>
                         <p className="text-sm font-semibold text-slate-500 pl-7">{step.duration}</p>
                        <p className="text-slate-600 mt-2 pl-7">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingPlanDisplay;
