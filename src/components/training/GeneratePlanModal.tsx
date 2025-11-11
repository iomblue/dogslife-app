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

  const handleSubmit = () => {
    if (goal) {
      onGenerate(goal, breed, age);
    }
  };

  const inputClasses = "mt-1 block w-full p-2 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-bold mb-4">Generate Training Plan</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-slate-700">Training Goal</label>
            <select id="goal" value={goal} onChange={e => setGoal(e.target.value as TrainingGoal)} className={inputClasses}>
              <option value="sit">Sit</option>
              <option value="stay">Stay</option>
              <option value="come">Come</option>
              <option value="leash">Leash Training</option>
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
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onCancel} disabled={isLoading} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanModal;
