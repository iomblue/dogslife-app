import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../types';

interface AddExpenseModalProps {
    onSave: (expense: Omit<Expense, 'id'>) => void;
    onCancel: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onSave, onCancel }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.FOOD);
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!date || !category || isNaN(numericAmount) || numericAmount <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        onSave({ date, category, amount: numericAmount, notes });
    };
    
    const inputClasses = "mt-1 block w-full p-2 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onCancel}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-slate-800">Add Expense</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
                                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className={inputClasses} />
                            </div>
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                                <select id="category" value={category} onChange={e => setCategory(e.target.value as ExpenseCategory)} required className={inputClasses}>
                                    {Object.values(ExpenseCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Amount ($)</label>
                                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" placeholder="0.00" className={inputClasses} />
                            </div>
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
                                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="e.g., 30lb bag of kibble" className={inputClasses}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                        <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;