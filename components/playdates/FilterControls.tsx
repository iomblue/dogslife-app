import React from 'react';

interface FilterControlsProps {
    onFilterChange: (filters: any) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
    
    const selectClasses = "p-1 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500";

    return (
        <div className="bg-white p-3 rounded-lg shadow-md border flex items-center justify-between gap-2 text-sm">
            <div>
                <label className="font-semibold text-slate-600">Distance: </label>
                <select className={selectClasses}>
                    <option>Up to 5 km</option>
                    <option>Up to 10 km</option>
                </select>
            </div>
             <div>
                <label className="font-semibold text-slate-600">Size: </label>
                <select className={selectClasses}>
                    <option>Any</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
            </div>
        </div>
    );
};

export default FilterControls;