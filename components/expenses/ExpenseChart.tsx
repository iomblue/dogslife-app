import React from 'react';
import { ExpenseCategory } from '../../types';

interface ExpenseChartProps {
    data: { name: string; value: number }[];
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD]: '#22c55e', // green-500
    [ExpenseCategory.VET]: '#ef4444', // red-500
    [ExpenseCategory.MEDICATION]: '#0ea5e9', // sky-500
    [ExpenseCategory.GROOMING]: '#ec4899', // pink-500
    [ExpenseCategory.TOYS]: '#eab308', // yellow-500
    [ExpenseCategory.TRAINING]: '#a855f7', // purple-500
    [ExpenseCategory.OTHER]: '#64748b', // slate-500
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div className="aspect-square bg-slate-50 rounded-full flex items-center justify-center"><p className="text-slate-400 text-sm">No data</p></div>;

    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div className="relative aspect-square">
            <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                {data.map(({ name, value }) => {
                    const percent = value / total;
                    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                    cumulativePercent += percent;
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    const largeArcFlag = percent > 0.5 ? 1 : 0;
                    
                    const pathData = [
                        `M ${startX} ${startY}`, // Move
                        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                        `L 0 0`, // Line
                    ].join(' ');

                    return <path key={name} d={pathData} fill={CATEGORY_COLORS[name as ExpenseCategory]} />;
                })}
            </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-2/5 h-2/5 shadow-inner"></div>
            </div>
        </div>
    );
};

export default ExpenseChart;