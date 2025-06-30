import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SavedLocation,
  UserLocation,
  LocationPermissionStatus,
  Coordinate,
} from '../types/location';

const SAVED_LOCATIONS_KEY = 'saved_locations';

export class LocationService {
  private static instance: LocationService;
  private currentLocation: UserLocation | null = null;
  private locationSubscription: Location.LocationSubscription | null = null;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Request location permissions from the user
   */
  async requestLocationPermission(): Promise<LocationPermissionStatus> {
    try {
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      return {
        granted: status === 'granted',
        canAskAgain,
        status: status as 'granted' | 'denied' | 'undetermined',
      };
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied',
      };
    }
  }

  /**
   * Get the current location permission status
   */
  async getLocationPermissionStatus(): Promise<LocationPermissionStatus> {
    try {
      const { status, canAskAgain } =
        await Location.getForegroundPermissionsAsync();

      return {
        granted: status === 'granted',
        canAskAgain,
        status: status as 'granted' | 'denied' | 'undetermined',
      };
    } catch (error) {
      console.error('Error getting location permission status:', error);
      return {
        granted: false,
        canAskAgain: false,
        status: 'denied',
      };
    }
  }

  /**
   * Get the user's current location
   */
  async getCurrentLocation(): Promise<UserLocation | null> {
    try {
      const permissionStatus = await this.getLocationPermissionStatus();
      if (!permissionStatus.granted) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const userLocation: UserLocation = {
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        accuracy: location.coords.accuracy || undefined,
        altitude: location.coords.altitude || undefined,
        heading: location.coords.heading || undefined,
        speed: location.coords.speed || undefined,
        timestamp: location.timestamp,
      };

      this.currentLocation = userLocation;
      return userLocation;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Start watching the user's location
   */
  async startLocationUpdates(
    callback: (location: UserLocation) => void,
    errorCallback?: (error: string) => void
  ): Promise<boolean> {
    try {
      const permissionStatus = await this.getLocationPermissionStatus();
      if (!permissionStatus.granted) {
        errorCallback?.('Location permission not granted');
        return false;
      }

      this.locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        location => {
          const userLocation: UserLocation = {
            coordinate: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            accuracy: location.coords.accuracy || undefined,
            altitude: location.coords.altitude || undefined,
            heading: location.coords.heading || undefined,
            speed: location.coords.speed || undefined,
            timestamp: location.timestamp,
          };

          this.currentLocation = userLocation;
          callback(userLocation);
        }
      );

      return true;
    } catch (error) {
      console.error('Error starting location updates:', error);
      errorCallback?.('Failed to start location updates');
      return false;
    }
  }

  /**
   * Stop watching the user's location
   */
  stopLocationUpdates(): void {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
  }

  /**
   * Save a location to AsyncStorage
   */
  async saveLocation(
    location: Omit<SavedLocation, 'id' | 'timestamp'>
  ): Promise<SavedLocation> {
    try {
      const savedLocation: SavedLocation = {
        ...location,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      };

      const existingLocations = await this.getSavedLocations();
      const updatedLocations = [...existingLocations, savedLocation];

      await AsyncStorage.setItem(
        SAVED_LOCATIONS_KEY,
        JSON.stringify(updatedLocations)
      );
      return savedLocation;
    } catch (error) {
      console.error('Error saving location:', error);
      throw new Error('Failed to save location');
    }
  }

  /**
   * Get all saved locations from AsyncStorage
   */
  async getSavedLocations(): Promise<SavedLocation[]> {
    try {
      const locationsJson = await AsyncStorage.getItem(SAVED_LOCATIONS_KEY);
      if (!locationsJson) {
        return [];
      }

      const locations = JSON.parse(locationsJson) as SavedLocation[];
      return locations.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
    } catch (error) {
      console.error('Error getting saved locations:', error);
      return [];
    }
  }

  /**
   * Delete a saved location
   */
  async deleteLocation(locationId: string): Promise<boolean> {
    try {
      const existingLocations = await this.getSavedLocations();
      const updatedLocations = existingLocations.filter(
        loc => loc.id !== locationId
      );

      await AsyncStorage.setItem(
        SAVED_LOCATIONS_KEY,
        JSON.stringify(updatedLocations)
      );
      return true;
    } catch (error) {
      console.error('Error deleting location:', error);
      return false;
    }
  }

  /**
   * Update a saved location
   */
  async updateLocation(
    locationId: string,
    updates: Partial<Omit<SavedLocation, 'id' | 'timestamp'>>
  ): Promise<SavedLocation | null> {
    try {
      const existingLocations = await this.getSavedLocations();
      const locationIndex = existingLocations.findIndex(
        loc => loc.id === locationId
      );

      if (locationIndex === -1) {
        return null;
      }

      const updatedLocation = {
        ...existingLocations[locationIndex],
        ...updates,
      };

      existingLocations[locationIndex] = updatedLocation;
      await AsyncStorage.setItem(
        SAVED_LOCATIONS_KEY,
        JSON.stringify(existingLocations)
      );

      return updatedLocation;
    } catch (error) {
      console.error('Error updating location:', error);
      return null;
    }
  }

  /**
   * Calculate distance between two coordinates (in meters)
   */
  calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Calculate bearing between two coordinates (in degrees)
   */
  calculateBearing(coord1: Coordinate, coord2: Coordinate): number {
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    const θ = Math.atan2(y, x);
    return ((θ * 180) / Math.PI + 360) % 360; // Normalize to 0-360 degrees
  }

  /**
   * Get the current cached location
   */
  getCachedLocation(): UserLocation | null {
    return this.currentLocation;
  }

  /**
   * Clear all saved locations
   */
  async clearAllLocations(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(SAVED_LOCATIONS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing all locations:', error);
      return false;
    }
  }
}

export default LocationService;
