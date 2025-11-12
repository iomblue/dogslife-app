import React, { useState, useEffect } from 'react';
import { MedicalRecord, MedicalRecordType } from '../../types';

interface AddMedicalRecordFormProps {
  onSave: (record: Omit<MedicalRecord, 'id'>) => void;
  onCancel: () => void;
  record: MedicalRecord | null;
}

const AddMedicalRecordForm: React.FC<AddMedicalRecordFormProps> = ({ onSave, onCancel, record }) => {
  const [type, setType] = useState<MedicalRecordType>(MedicalRecordType.VET_VISIT);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (record) {
      setType(record.type);
      setDate(new Date(record.date).toISOString().split('T')[0]);
      setTitle(record.title);
      setDetails(record.details);
      setDueDate(record.dueDate ? new Date(record.dueDate).toISOString().split('T')[0] : '');
    }
  }, [record]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a title.');
      return;
    }
    onSave({ type, date, title, details, dueDate: dueDate || undefined });
  };

  const inputClasses = "mt-1 block w-full p-2 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md";

  return (
    <form onSubmit={handleSubmit}>
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">{record ? 'Edit' : 'Add'} Medical Record</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-700">Record Type</label>
                    <select id="type" value={type} onChange={e => setType(e.target.value as MedicalRecordType)} required className={inputClasses}>
                        {Object.values(MedicalRecordType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title / Description</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g., Annual Checkup" className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-slate-700">Details / Notes (Optional)</label>
                    <textarea id="details" value={details} onChange={e => setDetails(e.target.value)} rows={3} className={inputClasses}></textarea>
                </div>
                {(type === MedicalRecordType.VACCINATION || type === MedicalRecordType.MEDICATION) && (
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Next Due Date (Optional)</label>
                        <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputClasses} />
                    </div>
                )}
            </div>
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
            <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save Record</button>
        </div>
    </form>
  );
};

export default AddMedicalRecordForm;
