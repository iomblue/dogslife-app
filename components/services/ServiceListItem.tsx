import React from 'react';
import type { DogService, GeoLocation } from '../../types';
import { ServiceType } from '../../types';
import { haversineDistance } from '../../utils/geolocation';

interface ServiceListItemProps {
    service: DogService;
    userLocation: GeoLocation | null;
}

const ICONS: Record<ServiceType, React.FC<React.SVGProps<SVGSVGElement>>> = {
    [ServiceType.PARK]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 12h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M10 21V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4ZM13 21v-9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/></svg>,
    [ServiceType.VET]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M18 14a2 2 0 1 0 4 0V6a6 6 0 1 0-8 0v4"/><path d="M4 14h16"/><circle cx="12" cy="4" r="2"/></svg>,
    [ServiceType.GROOMER]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a2.5 2.5 0 0 1 3 2.5v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V4a2.5 2.5 0 0 1 5 0v3.5a.5.5 0 0 0 .5.5h.5a2.5 2.5 0 0 1 0 5h-.5a.5.5 0 0 0-.5.5V17a2.5 2.5 0 0 1-5 0v-1.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V19a2.5 2.5 0 0 1-3 2.5c-1.07 0-2.09-.7-2.5-1.5a.5.5 0 0 0-.5-.5H3a2.5 2.5 0 0 1 0-5h.5a.5.5 0 0 0 .5-.5V7.5A2.5 2.5 0 0 1 7 5h2a.5.5 0 0 0 .5-.5V4a2.5 2.5 0 0 1 2.5-2.5Z"/></svg>,
    [ServiceType.TRAINER]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14v8"/><path d="M15.34 11.66 12 15l-3.34-3.34"/><path d="M12 3v2.72"/><path d="m18.2 6.8-.5.87"/><path d="M6.3 7.67l-.5-.87"/><path d="M12 21a9 9 0 0 0 9-9c0-4.09-2.7-7.5-6.33-8.68"/></svg>,
    [ServiceType.BOARDING]: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

const SERVICE_COLORS: Record<ServiceType, string> = {
    [ServiceType.PARK]: 'bg-green-100 text-green-700',
    [ServiceType.VET]: 'bg-red-100 text-red-700',
    [ServiceType.GROOMER]: 'bg-pink-100 text-pink-700',
    [ServiceType.TRAINER]: 'bg-purple-100 text-purple-700',
    [ServiceType.BOARDING]: 'bg-orange-100 text-orange-700',
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(rating) ? "#f59e0b" : "#e2e8f0"} stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ))}
        <span className="ml-2 text-sm font-bold text-slate-600">{rating.toFixed(1)}</span>
    </div>
);


const ServiceListItem: React.FC<ServiceListItemProps> = ({ service, userLocation }) => {
    const Icon = ICONS[service.type];
    const colorClasses = SERVICE_COLORS[service.type];
    const distance = userLocation ? haversineDistance(userLocation, service.location) : null;

    return (
        <div className="bg-white p-4 rounded-lg shadow border flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-grow">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-slate-800">{service.name}</p>
                        <p className="text-sm font-semibold text-slate-500">{service.type}</p>
                    </div>
                     {distance !== null && (
                        <p className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{distance.toFixed(1)} km</p>
                    )}
                 </div>
                 <div className="mt-1">
                    <StarRating rating={service.rating} />
                 </div>
            </div>
        </div>
    );
};

export default ServiceListItem;
