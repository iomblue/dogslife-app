import React from 'react';
import type { MedicalRecord } from '../../types';
import MedicalRecordItem from './MedicalRecordItem';

interface MedicalHistoryListProps {
    records: MedicalRecord[];
}

const MedicalHistoryList: React.FC<MedicalHistoryListProps> = ({ records }) => {
    const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (records.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-slate-500">No medical records have been added yet.</p>
                <p className="text-sm text-slate-400 mt-1">Click "Add Record" to start building your pet's history.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {sortedRecords.map(record => (
                <MedicalRecordItem key={record.id} record={record} />
            ))}
        </div>
    );
};

export default MedicalHistoryList;
