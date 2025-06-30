import { useState, useEffect, useCallback } from 'react';
import { LocationIndicator } from '../types/compass';
import { UserLocation } from '../types/location';
import CompassService from '../services/compassService';
import LocationService from '../services/locationService';

interface UseCompassResult {
  heading: number;
  indicators: LocationIndicator[];
  isCompassActive: boolean;
  error: string | null;
  accuracy: 'low' | 'medium' | 'high';
  startCompass: () => Promise<void>;
  stopCompass: () => void;
  refreshIndicators: () => Promise<void>;
}

export function useCompass(): UseCompassResult {
  const [heading, setHeading] = useState<number>(0);
  const [indicators, setIndicators] = useState<LocationIndicator[]>([]);
  const [isCompassActive, setIsCompassActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<'low' | 'medium' | 'high'>('medium');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const compassService = CompassService.getInstance();
  const locationService = LocationService.getInstance();

  const updateIndicators = useCallback(
    async (currentUserLocation: UserLocation) => {
      try {
        const newIndicators = await compassService.calculateLocationIndicators(
          currentUserLocation.coordinate
        );
        setIndicators(newIndicators);
      } catch (err) {
        console.error('Error updating indicators:', err);
      }
    },
    [compassService]
  );

  const refreshIndicators = useCallback(async () => {
    if (userLocation) {
      await updateIndicators(userLocation);
    }
  }, [userLocation, updateIndicators]);

  const startCompass = useCallback(async () => {
    try {
      setError(null);
      setIsCompassActive(true);

      // Get user location first
      const currentLocation = await locationService.getCurrentLocation();
      if (!currentLocation) {
        throw new Error('Could not get current location');
      }
      setUserLocation(currentLocation);

      // Start compass
      const compassStarted = await compassService.startCompass(
        (newHeading: number) => {
          setHeading(newHeading);
        },
        (compassError: string) => {
          setError(compassError);
          setIsCompassActive(false);
        }
      );

      if (!compassStarted) {
        throw new Error('Failed to start compass');
      }

      // Get initial indicators
      await updateIndicators(currentLocation);

      // Get compass accuracy
      const compassAccuracy = await compassService.getCompassAccuracy();
      setAccuracy(compassAccuracy);

      // Start location updates to keep indicators current
      locationService.startLocationUpdates(
        (newLocation: UserLocation) => {
          setUserLocation(newLocation);
          updateIndicators(newLocation);
        },
        (locationError: string) => {
          console.warn('Location update error:', locationError);
        }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsCompassActive(false);
    }
  }, [compassService, locationService, updateIndicators]);

  const stopCompass = useCallback(() => {
    compassService.stopCompass();
    locationService.stopLocationUpdates();
    setIsCompassActive(false);
    setHeading(0);
    setIndicators([]);
    setError(null);
    setUserLocation(null);
  }, [compassService, locationService]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCompass();
    };
  }, [stopCompass]);

  return {
    heading,
    indicators,
    isCompassActive,
    error,
    accuracy,
    startCompass,
    stopCompass,
    refreshIndicators,
  };
}
