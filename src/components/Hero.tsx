import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">Symptom Checker</h2>
      <p className="text-slate-500 mt-2">Enter your dog's symptoms for an AI-powered preliminary analysis.</p>
      <p className="text-xs text-slate-400 mt-4">This tool provides information for educational purposes only and is not a substitute for professional veterinary advice.</p>
    </div>
  );
};

export default Hero;
