import React from 'react';
import type { DogService, GeoLocation } from '../../types';
import { ServiceType } from '../../types';

interface ServicesMapViewProps {
    services: DogService[];
    userLocation: GeoLocation | null;
}

const SERVICE_COLORS: Record<ServiceType, string> = {
    [ServiceType.PARK]: '#22c55e', // green-500
    [ServiceType.VET]: '#ef4444', // red-500
    [ServiceType.GROOMER]: '#ec4899', // pink-500
    [ServiceType.TRAINER]: '#a855f7', // purple-500
    [ServiceType.BOARDING]: '#f97316', // orange-500
};

const ServicesMapView: React.FC<ServicesMapViewProps> = ({ services, userLocation }) => {
    const allPoints = [...services.map(s => s.location), ...(userLocation ? [userLocation] : [])];

    if (allPoints.length === 0) {
        return (
            <div className="aspect-video w-full bg-slate-100 flex items-center justify-center rounded-lg border">
                <p className="text-slate-500">No locations to display.</p>
            </div>
        );
    }
    
    const PADDING = 20;
    const WIDTH = 500;
    const HEIGHT = 300;

    const lats = allPoints.map(p => p.lat);
    const lngs = allPoints.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    
    const scaleX = (WIDTH - PADDING * 2) / lngRange;
    const scaleY = (HEIGHT - PADDING * 2) / latRange;
    const scale = Math.min(scaleX, scaleY);
    
    const getCoords = (loc: GeoLocation) => ({
        x: ((loc.lng - minLng) * scale) + PADDING,
        y: ((maxLat - loc.lat) * scale) + PADDING,
    });

    return (
        <div className="relative w-full aspect-video bg-slate-100 rounded-lg border overflow-hidden">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="relative w-full h-full">
                {services.map(service => {
                    const { x, y } = getCoords(service.location);
                    return (
                        <g key={service.id} transform={`translate(${x}, ${y})`} className="cursor-pointer group">
                             <circle r="6" fill={SERVICE_COLORS[service.type]} stroke="white" strokeWidth="2" />
                             <title>{service.name} ({service.type})</title>
                        </g>
                    );
                })}
                {userLocation && (() => {
                    const { x, y } = getCoords(userLocation);
                    return (
                        <g transform={`translate(${x}, ${y})`}>
                            <circle r="7" fill="rgba(59, 130, 246, 0.3)" />
                            <circle r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
                            <title>Your Location</title>
                        </g>
                    );
                })()}
            </svg>
        </div>
    );
};

export default ServicesMapView;
