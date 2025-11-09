import React from 'react';

interface RouteMapProps {
    route: { lat: number; lng: number }[];
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
    if (route.length < 2) {
        return (
            <div className="aspect-video w-full bg-slate-100 flex items-center justify-center">
                <p className="text-slate-500 text-sm">Waiting for GPS signal...</p>
            </div>
        );
    }

    const PADDING = 20;
    const WIDTH = 500;
    const HEIGHT = 300;

    const lats = route.map(p => p.lat);
    const lngs = route.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    
    const scaleX = (WIDTH - PADDING * 2) / lngRange;
    const scaleY = (HEIGHT - PADDING * 2) / latRange;
    const scale = Math.min(scaleX, scaleY);

    const points = route.map(p => {
        const x = ((p.lng - minLng) * scale) + PADDING;
        const y = ((maxLat - p.lat) * scale) + PADDING;
        return `${x},${y}`;
    }).join(' ');

    const startPoint = points.split(' ')[0].split(',');
    const endPoint = points.split(' ')[points.split(' ').length - 1].split(',');

    return (
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full bg-slate-100">
            <polyline
                points={points}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
             {/* Start Point */}
            <circle cx={startPoint[0]} cy={startPoint[1]} r="5" fill="#16a34a" />
             {/* End Point */}
            <circle cx={endPoint[0]} cy={endPoint[1]} r="5" fill="#dc2626" />
        </svg>
    );
};

export default RouteMap;
