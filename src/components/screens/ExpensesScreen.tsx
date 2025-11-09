import React, { useState, useEffect, useMemo } from 'react';
import type { Expense } from '../../types';
import AddExpenseModal from '../expenses/AddExpenseModal';
import ExpenseSummary from '../expenses/ExpenseSummary';
import ExpenseChart from '../expenses/ExpenseChart';
import ExpenseList from '../expenses/ExpenseList';

const ExpensesScreen: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(() => {
        try {
            const savedExpenses = localStorage.getItem('paws-expenses');
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (e) {
            return [];
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('paws-expenses', JSON.stringify(expenses));
    }, [expenses]);

    const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense: Expense = {
            ...expense,
            id: new Date().toISOString() + Math.random(),
        };
        setExpenses(prev => [newExpense, ...prev]);
        setIsModalOpen(false);
    };

    const categoryData = useMemo(() => {
        const data = expenses.reduce<Record<string, number>>((acc, expense) => {
            const category = expense.category;
            acc[category] = (acc[category] || 0) + expense.amount;
            return acc;
        }, {});
        
        return Object.entries(data).map(([name, value]) => ({ name, value }));
    }, [expenses]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Expense Tracker</h2>
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Expense
                    </button>
                </div>

                {expenses.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <ExpenseChart data={categoryData} />
                        </div>
                        <div className="lg:col-span-3">
                            <ExpenseSummary data={categoryData} />
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-20 bg-white rounded-lg border">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-12 w-12 mx-auto text-slate-300 mb-2"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        <p className="text-slate-500">No expenses logged yet.</p>
                        <p className="text-sm text-slate-400">Click "Add Expense" to start tracking your spending.</p>
                    </div>
                )}
                
                <div className="mt-12">
                     <h3 className="text-2xl font-bold text-slate-800 mb-4">History</h3>
                    <ExpenseList expenses={expenses} />
                </div>
            </div>

            {isModalOpen && (
                <AddExpenseModal onSave={handleAddExpense} onCancel={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default ExpensesScreen;