import React from 'react';
import type { MedicalRecord } from '../../types';

interface UpcomingRemindersProps {
  reminders: MedicalRecord[];
  onEdit: (reminder: MedicalRecord) => void;
}

const UpcomingReminders: React.FC<UpcomingRemindersProps> = ({ reminders, onEdit }) => {
  if (reminders.length === 0) {
    return <div className="text-center text-slate-500 bg-slate-50 p-4 rounded-lg border">No upcoming reminders.</div>;
  }

  return (
    <div className="space-y-3">
      {reminders.slice(0, 3).map(item => (
        <button key={item.id} onClick={() => onEdit(item)} className="w-full text-left bg-white p-3 rounded-lg shadow-sm border flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700">{item.title}</p>
            <p className="text-sm text-slate-500">Due: {new Date(item.dueDate!).toLocaleDateString()}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default UpcomingReminders;
