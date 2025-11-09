import React, { useState } from 'react';
import type { TrainingGoal } from '../../types';

interface GeneratePlanModalProps {
    onGenerate: (goal: TrainingGoal, breed: string, age: string) => void;
    onCancel: () => void;
    isLoading: boolean;
}

const GeneratePlanModal: React.FC<GeneratePlanModalProps> = ({ onGenerate, onCancel, isLoading }) => {
    const [goal, setGoal] = useState<TrainingGoal>('sit');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');

    const handleGenerate = () => {
        onGenerate(goal, breed, age);
    };

    const inputClasses = "w-full p-2 border rounded-md bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4">Generate Training Plan</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-slate-700">Training Goal</label>
                        <select id="goal" value={goal} onChange={e => setGoal(e.target.value as TrainingGoal)} className={inputClasses}>
                            <option value="sit">Sit</option>
                            <option value="stay">Stay</option>
                            <option value="come">Come When Called</option>
                            <option value="leash">Leash Walking</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="breed" className="block text-sm font-medium text-slate-700">Dog Breed (Optional)</label>
                        <input type="text" id="breed" value={breed} onChange={e => setBreed(e.target.value)} placeholder="e.g., Golden Retriever" className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-slate-700">Dog Age (Optional)</label>
                        <input type="text" id="age" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g., 6 months" className={inputClasses} />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onCancel} className="bg-slate-200 py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:bg-slate-400">
                        {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneratePlanModal;