import React from 'react';
import { ExpenseCategory } from '../../types';

interface ExpenseSummaryProps {
    data: { name: string; value: number }[];
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD]: 'bg-green-500',
    [ExpenseCategory.VET]: 'bg-red-500',
    [ExpenseCategory.MEDICATION]: 'bg-sky-500',
    [ExpenseCategory.GROOMING]: 'bg-pink-500',
    [ExpenseCategory.TOYS]: 'bg-yellow-500',
    [ExpenseCategory.TRAINING]: 'bg-purple-500',
    [ExpenseCategory.OTHER]: 'bg-slate-500',
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border h-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Spending Summary</h3>
            <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-slate-500">Total Spent</p>
                <p className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</p>
            </div>
            <div className="space-y-3">
                {data.sort((a,b) => b.value - a.value).map(({ name, value }) => (
                    <div key={name} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                             <span className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[name as ExpenseCategory]}`}></span>
                             <span className="text-slate-700">{name}</span>
                        </div>
                        <div className="font-semibold text-slate-800">
                           <span>${value.toFixed(2)}</span>
                           <span className="text-xs text-slate-400 ml-2">({((value / total) * 100).toFixed(0)}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseSummary;