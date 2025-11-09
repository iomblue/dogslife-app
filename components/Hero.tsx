

import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Worried about your pet?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Get instant, AI-powered insights into your pet's health symptoms. Just describe what's happening below to receive a preliminary analysis and guidance on next steps.
            </p>
        </div>
    );
};

export default Hero;
