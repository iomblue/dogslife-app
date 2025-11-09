import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { Walk } from '../../types';
import { haversineDistance } from '../../utils/geolocation';
import RouteMap from '../fitness/RouteMap';
import WalkHistoryItem from '../fitness/WalkHistoryItem';
import EditWalkModal from '../fitness/EditWalkModal';

const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};

const formatTotalTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    let timeString = '';
    if (h > 0) timeString += `${h} hr `;
    if (m > 0 || h > 0) timeString += `${m} min`;
    if (timeString === '') timeString = `${Math.floor(seconds)} sec`;
    return timeString.trim();
};

const FitnessScreen: React.FC = () => {
    const [walks, setWalks] = useState<Walk[]>(() => {
        try {
            const savedWalks = localStorage.getItem('paws-walks');
            return savedWalks ? JSON.parse(savedWalks) : [];
        } catch (e) { return []; }
    });
    
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [route, setRoute] = useState<{ lat: number; lng: number }[]>([]);
    const [locationError, setLocationError] = useState<string | null>(null);

    const [selectedWalk, setSelectedWalk] = useState<Walk | null>(null);
    const [walkToEdit, setWalkToEdit] = useState<Walk | null>(null);

    const timerIntervalRef = useRef<number | null>(null);
    const watchIdRef = useRef<number | null>(null);

    useEffect(() => {
        localStorage.setItem('paws-walks', JSON.stringify(walks));
    }, [walks]);

    const stopTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    };

    const stopGeolocation = () => {
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
    };
    
    const startTracking = useCallback(() => {
        setLocationError(null);
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        setIsTracking(true);
        const startTime = Date.now() - elapsedTime * 1000;
        timerIntervalRef.current = window.setInterval(() => {
            setElapsedTime((Date.now() - startTime) / 1000);
        }, 1000);

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                setRoute(prevRoute => {
                    const newRoute = [...prevRoute, { lat, lng }];
                    if (newRoute.length > 1) {
                        const lastPoint = newRoute[newRoute.length - 2];
                        const newDistance = haversineDistance(lastPoint, { lat, lng });
                        setDistance(prevDistance => prevDistance + newDistance);
                    }
                    return newRoute;
                });
            },
            (error) => {
                setLocationError(`Location error: ${error.message}. Please ensure GPS is enabled.`);
                stopTracking();
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

    }, [elapsedTime]);

    const stopTracking = useCallback(() => {
        setIsTracking(false);
        stopTimer();
        stopGeolocation();
    }, []);

    const handleStartStop = () => {
        if (isTracking) {
            stopTracking();
        } else {
            startTracking();
        }
    };

    const handleFinish = () => {
        stopTracking();
        if (elapsedTime > 5 && distance > 0.01) {
            const finalAvgSpeed = elapsedTime > 0 ? (distance / (elapsedTime / 3600)) : 0;
            const newWalk: Walk = {
                id: new Date().toISOString(),
                date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
                duration: Math.round(elapsedTime),
                distance: parseFloat(distance.toFixed(2)),
                route,
                avgSpeed: parseFloat(finalAvgSpeed.toFixed(1)),
            };
            setWalks(prevWalks => [newWalk, ...prevWalks]);
        }
        setElapsedTime(0);
        setDistance(0);
        setRoute([]);
    };

    const handleDeleteWalk = (walkId: string) => {
        if (window.confirm("Are you sure you want to delete this walk?")) {
            setWalks(prev => prev.filter(w => w.id !== walkId));
        }
    };
    
    const handleUpdateWalk = (updatedWalk: Walk) => {
        const newAvgSpeed = updatedWalk.duration > 0
            ? updatedWalk.distance / (updatedWalk.duration / 3600)
            : 0;
        const finalWalk = { ...updatedWalk, avgSpeed: parseFloat(newAvgSpeed.toFixed(1)) };
        
        setWalks(prev => prev.map(w => w.id === finalWalk.id ? finalWalk : w));
        setWalkToEdit(null);
    };

    const lifetimeStats = useMemo(() => {
        const totals = walks.reduce((acc, walk) => {
            acc.totalDistance += walk.distance;
            acc.totalDuration += walk.duration;
            return acc;
        }, { totalDistance: 0, totalDuration: 0 });

        const overallAvgSpeed = totals.totalDuration > 0 ? totals.totalDistance / (totals.totalDuration / 3600) : 0;

        return { ...totals, overallAvgSpeed };
    }, [walks]);

    const liveAvgSpeed = elapsedTime > 0 ? (distance / (elapsedTime / 3600)) : 0;

    useEffect(() => {
        return () => { // Cleanup on unmount
            stopTimer();
            stopGeolocation();
        };
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                     <h2 className="text-3xl font-bold text-slate-800">GPS Walk Tracker</h2>
                     <p className="text-slate-500 mt-2">Track your walk in real-time with GPS.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
                    {locationError && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{locationError}</div>}
                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Duration</p>
                            <p className="text-3xl md:text-4xl font-bold text-blue-600 tabular-nums">{formatTime(elapsedTime)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Distance (km)</p>
                            <p className="text-3xl md:text-4xl font-bold text-blue-600 tabular-nums">{distance.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Avg Speed (km/h)</p>
                            <p className="text-3xl md:text-4xl font-bold text-blue-600 tabular-nums">{liveAvgSpeed.toFixed(1)}</p>
                        </div>
                    </div>
                     {route.length > 0 && (
                        <div className="mb-6 rounded-lg overflow-hidden border">
                            <RouteMap route={route} />
                        </div>
                     )}
                    <div className="flex gap-4">
                        <button onClick={handleStartStop} className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${isTracking ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                            {isTracking ? 'Pause' : (elapsedTime > 0 ? 'Resume' : 'Start')}
                        </button>
                        <button onClick={handleFinish} disabled={elapsedTime === 0 && !isTracking} className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed">
                            Finish & Log
                        </button>
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Walk History</h3>
                    
                    {walks.length > 0 && (
                         <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Walks</p>
                                <p className="text-2xl font-bold">{walks.length}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Distance</p>
                                <p className="text-2xl font-bold">{lifetimeStats.totalDistance.toFixed(2)} km</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Duration</p>
                                <p className="text-2xl font-bold">{formatTotalTime(lifetimeStats.totalDuration)}</p>
                            </div>
                             <div>
                                <p className="text-sm font-medium text-blue-600">Avg Speed</p>
                                <p className="text-2xl font-bold">{lifetimeStats.overallAvgSpeed.toFixed(1)} km/h</p>
                            </div>
                        </div>
                    )}

                    {walks.length > 0 ? (
                        <ul className="space-y-4">
                            {walks.map(walk => (
                                <WalkHistoryItem 
                                    key={walk.id} 
                                    walk={walk} 
                                    onSelect={() => setSelectedWalk(walk)} 
                                    onEdit={() => setWalkToEdit(walk)}
                                    onDelete={() => handleDeleteWalk(walk.id)}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg border">
                            <p className="text-slate-500">You haven't logged any walks yet.</p>
                            <p className="text-sm text-slate-400">Your completed walks will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedWalk && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedWalk(null)}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-1">Walk on {selectedWalk.date}</h3>
                        <div className="flex gap-4 text-sm text-slate-500 mb-3">
                           <span>Duration: <strong>{formatTime(selectedWalk.duration)}</strong></span>
                           <span>Distance: <strong>{selectedWalk.distance} km</strong></span>
                           {selectedWalk.avgSpeed && <span>Avg Speed: <strong>{selectedWalk.avgSpeed.toFixed(1)} km/h</strong></span>}
                        </div>
                        <div className="rounded-lg overflow-hidden border">
                            <RouteMap route={selectedWalk.route} />
                        </div>
                        <button onClick={() => setSelectedWalk(null)} className="mt-4 w-full bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded-lg hover:bg-slate-300">Close</button>
                    </div>
                </div>
            )}

            {walkToEdit && (
                <EditWalkModal 
                    walk={walkToEdit}
                    onSave={handleUpdateWalk}
                    onCancel={() => setWalkToEdit(null)}
                />
            )}
        </div>
    );
};

export default FitnessScreen;
