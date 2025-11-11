import React from 'react';
import type { MedicalRecord } from '../../types';

interface MedicalHistoryScreenProps {
  records: MedicalRecord[];
  onBack: () => void;
}

const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = ({ records, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <h2 className="text-3xl font-bold text-slate-800">Full Medical History</h2>
            </div>
            <div className="space-y-4">
                {records.length > 0 ? (
                    records.map(record => (
                        <div key={record.id} className="bg-white p-4 rounded-lg shadow border">
                            <p className="font-bold text-slate-800">{record.title}</p>
                            <p className="text-sm text-slate-500">{record.type} - {new Date(record.date).toLocaleDateString()}</p>
                            <p className="text-slate-600 mt-2">{record.details}</p>
                            {record.dueDate && <p className="text-sm text-blue-600 mt-1">Next due: {new Date(record.dueDate).toLocaleDateString()}</p>}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg border">
                        <p className="text-slate-500">No medical records found.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MedicalHistoryScreen;
