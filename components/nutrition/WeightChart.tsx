import React from 'react';
import type { WeightRecord } from '../../types';

interface WeightChartProps {
    data: WeightRecord[];
}

const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
    if (data.length < 2) return null;

    const PADDING = 30;
    const WIDTH = 400;
    const HEIGHT = 200;

    const weights = data.map(d => d.weight);
    const dates = data.map(d => new Date(d.date).getTime());

    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    
    // Avoid division by zero if all values are the same
    const weightRange = maxWeight - minWeight || 1; 
    const dateRange = maxDate - minDate || 1;

    const getX = (date: number) => ((date - minDate) / dateRange) * (WIDTH - PADDING * 2) + PADDING;
    const getY = (weight: number) => (HEIGHT - PADDING) - ((weight - minWeight) / weightRange) * (HEIGHT - PADDING * 2);

    const path = data.map((d, i) => {
        const x = getX(new Date(d.date).getTime());
        const y = getY(d.weight);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const yAxisLabels = [minWeight, minWeight + weightRange / 2, maxWeight];

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full bg-slate-50 rounded-md">
                {/* Y Axis Labels and Grid Lines */}
                {yAxisLabels.map(label => {
                    const y = getY(label);
                    return (
                        <g key={label}>
                            <text x="5" y={y + 3} fontSize="8" fill="#94a3b8">{label.toFixed(1)}</text>
                            <line x1={PADDING} y1={y} x2={WIDTH - PADDING} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                        </g>
                    )
                })}

                {/* Path */}
                <path d={path} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Points */}
                {data.map(d => (
                    <circle 
                        key={d.id} 
                        cx={getX(new Date(d.date).getTime())} 
                        cy={getY(d.weight)} 
                        r="3" 
                        fill="#3b82f6" 
                    />
                ))}

                {/* X Axis labels */}
                 <text x={PADDING} y={HEIGHT - 5} fontSize="8" fill="#94a3b8" textAnchor="start">
                    {new Date(minDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                </text>
                 <text x={WIDTH - PADDING} y={HEIGHT - 5} fontSize="8" fill="#94a3b8" textAnchor="end">
                    {new Date(maxDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                </text>
            </svg>
        </div>
    );
};

export default WeightChart;