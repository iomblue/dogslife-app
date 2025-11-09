

import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);


const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center" role="alert">
      <XCircleIcon className="h-6 w-6 mr-3"/>
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default ErrorDisplay;
