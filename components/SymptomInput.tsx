import React from 'react';

interface SymptomInputProps {
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ symptoms, setSymptoms, onSubmit, isLoading }) => {
  return (
    <div className="space-y-4">
      <label htmlFor="symptoms-input" className="block text-lg font-semibold text-slate-700 dark:text-slate-300">
        Describe your pet's symptoms
      </label>
      <textarea
        id="symptoms-input"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g., My dog has been vomiting since this morning and seems very tired..."
        className="w-full h-32 p-3 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Check Symptoms'
        )}
      </button>
    </div>
  );
};

export default SymptomInput;
