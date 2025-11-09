import React, { useState } from 'react';
import { MedicalRecord, MedicalRecordType } from '../../types';

interface AddMedicalRecordFormProps {
    onSave: (record: Omit<MedicalRecord, 'id'>) => void;
    onCancel: () => void;
}

const AddMedicalRecordForm: React.FC<AddMedicalRecordFormProps> = ({ onSave, onCancel }) => {
    const [type, setType] = useState<MedicalRecordType>(MedicalRecordType.VET_VISIT);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [wantsReminder, setWantsReminder] = useState(false);
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !title.trim() || !details.trim() || (wantsReminder && !dueDate)) {
            alert('Please fill out all required fields.');
            return;
        }
        
        const record: Omit<MedicalRecord, 'id'> = { type, date, title, details };
        if (wantsReminder && (type === MedicalRecordType.MEDICATION || type === MedicalRecordType.VACCINATION)) {
            record.dueDate = dueDate;
        }

        onSave(record);
    };
    
    const inputClasses = "mt-1 block w-full pl-3 pr-2 py-2 text-base bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md";

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">Add Medical Record</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="record-type" className="block text-sm font-medium text-slate-700">Record Type</label>
                    <select
                        id="record-type"
                        value={type}
                        onChange={(e) => {
                            const newType = e.target.value as MedicalRecordType;
                            setType(newType);
                            if (newType === MedicalRecordType.VET_VISIT) {
                                setWantsReminder(false);
                            }
                        }}
                        className={inputClasses}
                    >
                        <option>{MedicalRecordType.VET_VISIT}</option>
                        <option>{MedicalRecordType.VACCINATION}</option>
                        <option>{MedicalRecordType.MEDICATION}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="record-date" className="block text-sm font-medium text-slate-700">Date Administered</label>
                    <input
                        type="date"
                        id="record-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClasses}
                    />
                </div>
                 <div>
                    <label htmlFor="record-title" className="block text-sm font-medium text-slate-700">Title / Name</label>
                    <input
                        type="text"
                        id="record-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={
                            type === MedicalRecordType.VACCINATION ? "e.g., Rabies Booster" :
                            type === MedicalRecordType.MEDICATION ? "e.g., Flea & Tick Treatment" :
                            "e.g., Annual Checkup"
                        }
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="record-details" className="block text-sm font-medium text-slate-700">Details / Notes</label>
                    <textarea
                        id="record-details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Add any relevant details, such as dosage, vet's comments, or next due date."
                        rows={3}
                        className={inputClasses}
                    />
                </div>
                
                {(type === MedicalRecordType.MEDICATION || type === MedicalRecordType.VACCINATION) && (
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md border dark:border-slate-700">
                        <div className="flex items-center">
                            <input
                                id="reminder-checkbox"
                                type="checkbox"
                                checked={wantsReminder}
                                onChange={(e) => setWantsReminder(e.target.checked)}
                                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="reminder-checkbox" className="ml-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Set a reminder for next dose/booster
                            </label>
                        </div>
                        {wantsReminder && (
                            <div className="mt-3 animate-fade-in">
                                <label htmlFor="due-date" className="block text-sm font-medium text-slate-700">Due Date</label>
                                <input
                                    type="date"
                                    id="due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className={inputClasses}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition-colors">Save Record</button>
            </div>
        </form>
    );
};

export default AddMedicalRecordForm;
