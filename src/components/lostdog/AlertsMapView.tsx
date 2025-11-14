import React from 'react';
import type { LostDogAlert, GeoLocation } from '../../types';

interface AlertsMapViewProps {
    alerts: LostDogAlert[];
}

const AlertsMapView: React.FC<AlertsMapViewProps> = ({ alerts }) => {
    const allPoints = alerts.map(a => a.lastSeenLocation);

    if (allPoints.length === 0) {
        return (
            <div className="aspect-video w-full bg-slate-100 flex items-center justify-center rounded-lg border">
                <p className="text-slate-500">No active alerts to display on the map.</p>
            </div>
        );
    }
    
    const PADDING = 20;
    const WIDTH = 500;
    const HEIGHT = 300;

    let getCoords: (loc: GeoLocation) => { x: number; y: number; };

    if (allPoints.length === 1) {
        getCoords = () => ({ x: WIDTH / 2, y: HEIGHT / 2 });
    } else {
        const lats = allPoints.map(p => p.lat);
        const lngs = allPoints.map(p => p.lng);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        const latRange = maxLat - minLat || 0.1;
        const lngRange = maxLng - minLng || 0.1;
        
        const scaleX = (WIDTH - PADDING * 2) / lngRange;
        const scaleY = (HEIGHT - PADDING * 2) / latRange;
        const scale = Math.min(scaleX, scaleY);
        
        getCoords = (loc: GeoLocation) => ({
            x: ((loc.lng - minLng) * scale) + PADDING,
            y: ((maxLat - loc.lat) * scale) + PADDING,
        });
    }

    return (
        <div className="w-full aspect-video bg-slate-100 rounded-lg border overflow-hidden">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full">
                {alerts.map(alert => {
                    const { x, y } = getCoords(alert.lastSeenLocation);
                    return (
                        <g key={alert.id} transform={`translate(${x}, ${y})`} className="cursor-pointer group">
                             <circle r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                             <title>{alert.dogName} - Last Seen Here</title>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default AlertsMapView;
