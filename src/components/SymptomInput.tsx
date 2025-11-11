import React from 'react';

interface SymptomInputProps {
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ symptoms, setSymptoms, onSubmit, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g., \"My dog has been vomiting and has diarrhea...\""
        className="w-full p-2 border rounded-lg h-28 bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !symptoms.trim()}
        className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>
    </div>
  );
};

export default SymptomInput;
