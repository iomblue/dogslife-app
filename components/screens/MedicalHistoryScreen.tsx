import React from 'react';
import type { MedicalRecord } from '../../types';
import MedicalHistoryList from '../medical/MedicalHistoryList';

interface MedicalHistoryScreenProps {
    records: MedicalRecord[];
    onBack: () => void;
}

const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = ({ records, onBack }) => {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-8">
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-slate-200 mr-2"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <h2 className="text-3xl font-bold text-slate-800">Full Medical History</h2>
                </div>
                
                <MedicalHistoryList records={records} />
            </div>
        </div>
    );
};

export default MedicalHistoryScreen;
