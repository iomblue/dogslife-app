import React, { useState, useEffect, useMemo } from 'react';
import type { DogService, GeoLocation } from '../../../types';
import { ServiceType } from '../../../types';
import SearchBar from '../services/SearchBar';
import ServicesMapView from '../services/ServicesMapView';
import ServiceListItem from '../services/ServiceListItem';

const MOCK_SERVICES: DogService[] = [
    { id: '1', name: 'Happy Paws Vet Clinic', type: ServiceType.VET, location: { lat: 37.780, lng: -122.430 }, rating: 4.8 },
    { id: '2', name: 'Golden Gate Park Dog Run', type: ServiceType.PARK, location: { lat: 37.770, lng: -122.460 }, rating: 4.5 },
    { id: '3', name: 'SF Pet Groomers', type: ServiceType.GROOMER, location: { lat: 37.760, lng: -122.420 }, rating: 4.9 },
    { id: '4', name: 'City Pups Training Academy', type: ServiceType.TRAINER, location: { lat: 37.790, lng: -122.410 }, rating: 4.7 },
    { id: '5', name: 'The Dog House Boarding', type: ServiceType.BOARDING, location: { lat: 37.750, lng: -122.440 }, rating: 4.6 },
    { id: '6', name: 'Ocean Beach Dog Park', type: ServiceType.PARK, location: { lat: 37.760, lng: -122.505 }, rating: 4.8 },
];

const ServicesScreen: React.FC = () => {
    const [services] = useState<DogService[]>(() => {
         try {
            const savedServices = localStorage.getItem('paws-services');
            return savedServices ? JSON.parse(savedServices) : MOCK_SERVICES;
        } catch { return MOCK_SERVICES; }
    });
    
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState<GeoLocation | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => setLocationError('Could not get your location. Distances cannot be calculated.')
        );
    }, []);

    const filteredServices = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return services.filter(service => 
            service.name.toLowerCase().includes(query) || 
            service.type.toLowerCase().includes(query)
        );
    }, [searchQuery, services]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Find Dog Services</h2>
                    <p className="text-slate-500 mt-2">Search for parks, vets, groomers, and more near you.</p>
                </div>

                <div className="mb-6">
                    <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                </div>

                <div className="mb-6">
                    <ServicesMapView services={filteredServices} userLocation={userLocation} />
                </div>
                
                {locationError && <p className="text-sm text-red-500 text-center mb-4">{locationError}</p>}

                <div className="space-y-4">
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <ServiceListItem key={service.id} service={service} userLocation={userLocation} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg border">
                            <p className="text-slate-500">No services found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;
