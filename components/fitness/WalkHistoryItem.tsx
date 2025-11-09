import React from 'react';
import type { Walk } from '../../types';

interface WalkHistoryItemProps {
    walk: Walk;
    onSelect: (walk: Walk) => void;
    onEdit: (walk: Walk) => void;
    onDelete: (walkId: string) => void;
}

const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    let timeString = '';
    if (h > 0) timeString += `${h}h `;
    if (m > 0 || h > 0) timeString += `${m}m `;
    timeString += `${s}s`;
    
    return timeString.trim();
};

const MapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);


const WalkHistoryItem: React.FC<WalkHistoryItemProps> = ({ walk, onSelect, onEdit, onDelete }) => {
    return (
        <li className="bg-white p-4 rounded-lg shadow border grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <div className="md:col-span-2">
                <p className="font-bold text-slate-800">{walk.date}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                    <span>Duration: <span className="font-semibold text-slate-700">{formatTime(walk.duration)}</span></span>
                    <span>Distance: <span className="font-semibold text-slate-700">{walk.distance} km</span></span>
                    {walk.avgSpeed !== undefined && (
                         <span>Avg Speed: <span className="font-semibold text-slate-700">{walk.avgSpeed.toFixed(1)} km/h</span></span>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <button onClick={() => onSelect(walk)} className="p-2 text-slate-500 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-colors" title="View Map">
                    <MapIcon className="h-5 w-5"/>
                </button>
                <button onClick={() => onEdit(walk)} className="p-2 text-slate-500 hover:bg-yellow-100 hover:text-yellow-600 rounded-full transition-colors" title="Edit Walk">
                     <EditIcon className="h-5 w-5"/>
                </button>
                 <button onClick={() => onDelete(walk.id)} className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors" title="Delete Walk">
                    <TrashIcon className="h-5 w-5"/>
                </button>
            </div>
        </li>
    );
};

export default WalkHistoryItem;
