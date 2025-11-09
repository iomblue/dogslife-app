import React from 'react';
import type { Expense } from '../../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
    expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (expenses.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            {sortedExpenses.map(expense => (
                <ExpenseItem key={expense.id} expense={expense} />
            ))}
        </div>
    );
};

export default ExpenseList;