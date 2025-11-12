import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">Symptom Checker</h2>
      <p className="text-slate-500 mt-2">Enter your dog's symptoms for an AI-powered preliminary analysis.</p>
    </div>
  );
};

export default Hero;
