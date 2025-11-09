import React from 'react';
import type { Expense } from '../../types';
import { ExpenseCategory } from '../../types';

const ICONS: Record<ExpenseCategory, React.FC<React.SVGProps<SVGSVGElement>>> = {
    [ExpenseCategory.FOOD]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.5 7.5c1.5-2 5-2.5 7-1s1 5-1 7-5.5 3.5-7 1-1.5-4-1-6z"/><path d="M11.5 16.5c-1.5 2-5 2.5-7 1s-1-5 1-7 5.5-3.5 7-1 1.5 4 1 6z"/></svg>,
    [ExpenseCategory.VET]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M18 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M4 14h16"/><circle cx="12" cy="4" r="2"/></svg>,
    [ExpenseCategory.MEDICATION]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>,
    [ExpenseCategory.GROOMING]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a2.5 2.5 0 0 1 3 2.5v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V4a2.5 2.5 0 0 1 5 0v3.5a.5.5 0 0 0 .5.5h.5a2.5 2.5 0 0 1 0 5h-.5a.5.5 0 0 0-.5.5V17a2.5 2.5 0 0 1-5 0v-1.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V19a2.5 2.5 0 0 1-3 2.5c-1.07 0-2.09-.7-2.5-1.5a.5.5 0 0 0-.5-.5H3a2.5 2.5 0 0 1 0-5h.5a.5.5 0 0 0 .5-.5V7.5A2.5 2.5 0 0 1 7 5h2a.5.5 0 0 0 .5-.5V4a2.5 2.5 0 0 1 2.5-2.5Z"/></svg>,
    [ExpenseCategory.TOYS]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a5 5 0 0 0-5 5c0 1.66 1.34 3 3 3s3-1.34 3-3a5 5 0 0 0-5-5Z"/><path d="M12 22a5 5 0 0 0 5-5c0-1.66-1.34-3-3-3s-3 1.34-3 3a5 5 0 0 0 5 5Z"/></svg>,
    [ExpenseCategory.TRAINING]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14v8"/><path d="M15.34 11.66 12 15l-3.34-3.34"/><path d="M12 3v2.72"/><path d="m18.2 6.8-.5.87"/><path d="M6.3 7.67l-.5-.87"/><path d="M12 21a9 9 0 0 0 9-9c0-4.09-2.7-7.5-6.33-8.68"/></svg>,
    [ExpenseCategory.OTHER]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>,
};

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD]: 'bg-green-100 text-green-700',
    [ExpenseCategory.VET]: 'bg-red-100 text-red-700',
    [ExpenseCategory.MEDICATION]: 'bg-sky-100 text-sky-700',
    [ExpenseCategory.GROOMING]: 'bg-pink-100 text-pink-700',
    [ExpenseCategory.TOYS]: 'bg-yellow-100 text-yellow-700',
    [ExpenseCategory.TRAINING]: 'bg-purple-100 text-purple-700',
    [ExpenseCategory.OTHER]: 'bg-slate-100 text-slate-700',
};


interface ExpenseItemProps {
    expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
    const Icon = ICONS[expense.category];
    const colorClasses = CATEGORY_COLORS[expense.category];
    const formattedDate = new Date(expense.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow border flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-800">{expense.category}</p>
                    <p className="font-bold text-lg text-slate-800">${expense.amount.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <p className="text-slate-600">{expense.notes || 'No notes'}</p>
                    <p className="text-slate-500">{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseItem;