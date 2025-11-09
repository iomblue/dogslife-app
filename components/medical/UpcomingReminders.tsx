import React from 'react';
import type { MedicalRecord } from '../../types';
import { MedicalRecordType } from '../../types';

interface UpcomingRemindersProps {
    reminders: MedicalRecord[];
}

const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const SyringeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 2 4 4"/><path d="m17 7-3.5 3.5"/><path d="M15 9 9 15"/><path d="M12 6 9 3"/><path d="m6 12 3 3"/><path d="m3 21 6-6"/><path d="m3 11 4 4"/><path d="M13 1 9 5"/><path d="M22 13l-4-4"/></svg>
);

const PillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
);


const getDaysUntil = (dateString: string): { days: number, label: string, color: string } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    dueDate.setHours(0,0,0,0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { days: diffDays, label: 'Overdue', color: 'text-red-600 bg-red-100' };
    if (diffDays === 0) return { days: diffDays, label: 'Due today', color: 'text-amber-600 bg-amber-100' };
    if (diffDays <= 7) return { days: diffDays, label: `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`, color: 'text-yellow-600 bg-yellow-100' };
    return { days: diffDays, label: `Due in ${diffDays} days`, color: 'text-green-600 bg-green-100' };
};

const ReminderItem: React.FC<{ record: MedicalRecord }> = ({ record }) => {
    if (!record.dueDate) return null;
    
    const { label, color } = getDaysUntil(record.dueDate);
    const isVaccination = record.type === MedicalRecordType.VACCINATION;

    return (
        <div className="bg-white p-3 rounded-lg border flex items-center gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isVaccination ? 'bg-sky-100 text-sky-600' : 'bg-purple-100 text-purple-600'}`}>
                {isVaccination ? <SyringeIcon className="h-5 w-5" /> : <PillIcon className="h-5 w-5" />}
            </div>
            <div className="flex-grow">
                 <p className="font-semibold text-slate-800">{record.title}</p>
                 <p className="text-sm text-slate-500">{record.type}</p>
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
                {label}
            </div>
        </div>
    );
};


const UpcomingReminders: React.FC<UpcomingRemindersProps> = ({ reminders }) => {
    if (reminders.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-lg border">
                 <BellIcon className="h-10 w-10 mx-auto text-slate-300 mb-2"/>
                <p className="text-slate-500">No upcoming reminders.</p>
                <p className="text-sm text-slate-400 mt-1">Set a due date when adding a vaccination or medication.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {reminders.map(reminder => (
                <ReminderItem key={reminder.id} record={reminder} />
            ))}
        </div>
    );
};

export default UpcomingReminders;
