import { useState, useEffect, useCallback } from 'react';
import LocationService from '../services/locationService';
import {
  UserLocation,
  SavedLocation,
  LocationPermissionStatus,
  Coordinate,
} from '../types/location';

interface UseLocationReturn {
  // Current location state
  currentLocation: UserLocation | null;
  savedLocations: SavedLocation[];
  isLoading: boolean;
  error: string | null;

  // Permission state
  permissionStatus: LocationPermissionStatus | null;

  // Location operations
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<UserLocation | null>;
  startLocationUpdates: () => Promise<boolean>;
  stopLocationUpdates: () => void;

  // Saved location operations
  saveLocation: (
    name: string,
    coordinate: Coordinate,
    description?: string
  ) => Promise<SavedLocation | null>;
  deleteLocation: (locationId: string) => Promise<boolean>;
  updateLocation: (
    locationId: string,
    updates: Partial<Omit<SavedLocation, 'id' | 'timestamp'>>
  ) => Promise<SavedLocation | null>;
  refreshSavedLocations: () => Promise<void>;
  clearAllLocations: () => Promise<boolean>;

  // Utility functions
  calculateDistance: (coord1: Coordinate, coord2: Coordinate) => number;
  calculateBearing: (coord1: Coordinate, coord2: Coordinate) => number;
}

export function useLocation(): UseLocationReturn {
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(
    null
  );
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus | null>(null);
  const [locationService] = useState(() => LocationService.getInstance());

  // Initialize location service and load saved locations
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        // Check permission status
        const permission = await locationService.getLocationPermissionStatus();
        setPermissionStatus(permission);

        // Load saved locations
        const locations = await locationService.getSavedLocations();
        setSavedLocations(locations);

        // Get cached location if available
        const cached = locationService.getCachedLocation();
        if (cached) {
          setCurrentLocation(cached);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to initialize location service'
        );
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [locationService]);

  // Request location permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      const permission = await locationService.requestLocationPermission();
      setPermissionStatus(permission);
      return permission.granted;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to request permission'
      );
      return false;
    }
  }, [locationService]);

  // Get current location
  const getCurrentLocation =
    useCallback(async (): Promise<UserLocation | null> => {
      try {
        setIsLoading(true);
        setError(null);

        const location = await locationService.getCurrentLocation();
        if (location) {
          setCurrentLocation(location);
        }
        return location;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to get current location'
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    }, [locationService]);

  // Start location updates
  const startLocationUpdates = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      const success = await locationService.startLocationUpdates(
        location => {
          setCurrentLocation(location);
        },
        errorMessage => {
          setError(errorMessage);
        }
      );

      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to start location updates'
      );
      return false;
    }
  }, [locationService]);

  // Stop location updates
  const stopLocationUpdates = useCallback((): void => {
    locationService.stopLocationUpdates();
  }, [locationService]);

  // Save a new location
  const saveLocation = useCallback(
    async (
      name: string,
      coordinate: Coordinate,
      description?: string
    ): Promise<SavedLocation | null> => {
      try {
        setError(null);

        const savedLocation = await locationService.saveLocation({
          name,
          coordinate,
          description,
        });

        // Refresh saved locations
        const updatedLocations = await locationService.getSavedLocations();
        setSavedLocations(updatedLocations);

        return savedLocation;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to save location'
        );
        return null;
      }
    },
    [locationService]
  );

  // Delete a saved location
  const deleteLocation = useCallback(
    async (locationId: string): Promise<boolean> => {
      try {
        setError(null);

        const success = await locationService.deleteLocation(locationId);
        if (success) {
          // Refresh saved locations
          const updatedLocations = await locationService.getSavedLocations();
          setSavedLocations(updatedLocations);
        }

        return success;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to delete location'
        );
        return false;
      }
    },
    [locationService]
  );

  // Update a saved location
  const updateLocation = useCallback(
    async (
      locationId: string,
      updates: Partial<Omit<SavedLocation, 'id' | 'timestamp'>>
    ): Promise<SavedLocation | null> => {
      try {
        setError(null);

        const updatedLocation = await locationService.updateLocation(
          locationId,
          updates
        );
        if (updatedLocation) {
          // Refresh saved locations
          const updatedLocations = await locationService.getSavedLocations();
          setSavedLocations(updatedLocations);
        }

        return updatedLocation;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update location'
        );
        return null;
      }
    },
    [locationService]
  );

  // Refresh saved locations
  const refreshSavedLocations = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const locations = await locationService.getSavedLocations();
      setSavedLocations(locations);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to refresh locations'
      );
    }
  }, [locationService]);

  // Clear all saved locations
  const clearAllLocations = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      const success = await locationService.clearAllLocations();
      if (success) {
        setSavedLocations([]);
      }

      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to clear all locations'
      );
      return false;
    }
  }, [locationService]);

  // Calculate distance between coordinates
  const calculateDistance = useCallback(
    (coord1: Coordinate, coord2: Coordinate): number => {
      return locationService.calculateDistance(coord1, coord2);
    },
    [locationService]
  );

  // Calculate bearing between coordinates
  const calculateBearing = useCallback(
    (coord1: Coordinate, coord2: Coordinate): number => {
      return locationService.calculateBearing(coord1, coord2);
    },
    [locationService]
  );

  return {
    // State
    currentLocation,
    savedLocations,
    isLoading,
    error,
    permissionStatus,

    // Permission operations
    requestPermission,

    // Location operations
    getCurrentLocation,
    startLocationUpdates,
    stopLocationUpdates,

    // Saved location operations
    saveLocation,
    deleteLocation,
    updateLocation,
    refreshSavedLocations,
    clearAllLocations,

    // Utility functions
    calculateDistance,
    calculateBearing,
  };
}
