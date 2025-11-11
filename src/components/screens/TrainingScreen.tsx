import React, { useState, useEffect } from 'react';
import type { TrainingPlan, TrainingGoal } from '../../types';
import { generateTrainingPlan } from '../../services/geminiService';
import GeneratePlanModal from '../training/GeneratePlanModal';
import TrainingPlanDisplay from '../training/TrainingPlanDisplay';
import LoadingSpinner from '../LoadingSpinner';
import ErrorDisplay from '../ErrorDisplay';

const TrainingScreen: React.FC = () => {
    const [plans, setPlans] = useState<TrainingPlan[]>(() => {
        try { return JSON.parse(localStorage.getItem('paws-training-plans') || '[]'); } catch { return []; }
    });
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('paws-training-plans', JSON.stringify(plans));
    }, [plans]);

    useEffect(() => {
        if (plans.length > 0 && !selectedPlan) {
            setSelectedPlan(plans[0]);
        }
    }, [plans, selectedPlan]);

    const handleGenerate = async (goal: TrainingGoal, breed: string, age: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const newPlan = await generateTrainingPlan(goal, breed, age);
            setPlans(prev => [newPlan, ...prev]);
            setSelectedPlan(newPlan);
            setIsModalOpen(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Training Plans</h2>
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
                        + New Plan
                    </button>
                </div>

                {isLoading && <LoadingSpinner />}
                {error && !isLoading && <ErrorDisplay message={error} />}

                {plans.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex flex-wrap gap-2">
                            {plans.map((plan, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`py-2 px-4 rounded-full font-semibold text-sm ${selectedPlan?.goal === plan.goal && selectedPlan?.duration === plan.duration ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-blue-50'}`}
                                >
                                    {plan.goal}
                                </button>
                            ))}
                        </div>
                        {selectedPlan && <TrainingPlanDisplay plan={selectedPlan} />}
                    </div>
                )}
                
                {!isLoading && plans.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border">
                        <h3 className="text-xl font-semibold text-slate-700">No training plans yet.</h3>
                        <p className="text-slate-500 mt-2">Click "New Plan" to generate a custom training guide for your dog.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <GeneratePlanModal 
                    onGenerate={handleGenerate}
                    onCancel={() => setIsModalOpen(false)}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default TrainingScreen;
