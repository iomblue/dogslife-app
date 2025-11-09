import React from 'react';
import { MedicalRecord, MedicalRecordType } from '../../types';

const SyringeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 2 4 4"/><path d="m17 7-3.5 3.5"/><path d="M15 9 9 15"/><path d="M12 6 9 3"/><path d="m6 12 3 3"/><path d="m3 21 6-6"/><path d="m3 11 4 4"/><path d="M13 1 9 5"/><path d="M22 13l-4-4"/></svg>
);

const PillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
);

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M18 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M4 14h16"/><circle cx="12" cy="4" r="2"/></svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);


const RECORD_CONFIG = {
    [MedicalRecordType.VACCINATION]: {
        icon: <SyringeIcon className="h-6 w-6" />,
        color: 'text-sky-600',
        bgColor: 'bg-sky-100',
    },
    [MedicalRecordType.MEDICATION]: {
        icon: <PillIcon className="h-6 w-6" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
    },
    [MedicalRecordType.VET_VISIT]: {
        icon: <StethoscopeIcon className="h-6 w-6" />,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
    },
};


interface MedicalRecordItemProps {
    record: MedicalRecord;
}

const MedicalRecordItem: React.FC<MedicalRecordItemProps> = ({ record }) => {
    const config = RECORD_CONFIG[record.type];
    const formattedDate = new Date(record.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedDueDate = record.dueDate ? new Date(record.dueDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : null;

    return (
        <div className="bg-white p-4 rounded-lg shadow border flex items-start gap-4 animate-fade-in">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${config.bgColor} ${config.color}`}>
                {config.icon}
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800 text-lg">{record.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">{formattedDate}</p>
                </div>
                <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider">{record.type}</p>
                <p className="text-slate-600 mt-2">{record.details}</p>
                {formattedDueDate && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span>Next due: <span className="font-semibold">{formattedDueDate}</span></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecordItem;
