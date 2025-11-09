import React from 'react';

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-4 rounded-md mb-6" role="alert">
      <div className="flex">
        <div className="py-1">
          <AlertTriangleIcon className="h-6 w-6 text-amber-500 mr-4" />
        </div>
        <div>
          <p className="font-bold">Important Disclaimer</p>
          <p className="text-sm">
            This tool provides educational information and is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult a licensed veterinarian for any health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
