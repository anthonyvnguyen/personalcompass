import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Text } from '../../components/ui/text';
import { useLocation } from '../hooks/useLocation';
import { SavedLocation, Coordinate } from '../types/location';
import { useColorScheme } from '../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../styles/shared';
import { LoadingState, ErrorState } from '../components/common';
import {
  CurrentLocationCard,
  QuickActions,
  SavedLocationsList,
  StatusInfo,
} from '../components/map';

interface MapScreenProps {
  navigation: any;
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const { isDarkColorScheme } = useColorScheme();
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  );
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const { savedLocations, saveLocation, deleteLocation, clearAllLocations } =
    useLocation();

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLocationPermission(false);
        setIsLoading(false);
        return;
      }

      setLocationPermission(true);

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const coordinate: Coordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(coordinate);
      setDebugInfo(
        `Current location: ${coordinate.latitude.toFixed(6)}, ${coordinate.longitude.toFixed(6)}`
      );
    } catch (err) {
      console.error('Location initialization error:', err);
      setError(`Failed to get location: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addCurrentLocation = async () => {
    if (!currentLocation) {
      Alert.alert('Error', 'Current location not available');
      return;
    }

    try {
      const locationName = `Location ${savedLocations.length + 1}`;
      const result = await saveLocation(
        locationName,
        currentLocation,
        `Current location added on ${new Date().toLocaleDateString()}`
      );

      if (result) {
        setDebugInfo(
          `Added current location: ${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`
        );

        Alert.alert(
          'Location Added',
          `Added "${locationName}" to your compass locations.`,
          [{ text: 'OK' }]
        );
      } else {
        setError('Failed to save location');
      }
    } catch (err) {
      console.error('Error adding location:', err);
      setError(`Failed to add location: ${err}`);
    }
  };

  const addCustomLocation = () => {
    Alert.prompt(
      'Add Custom Location',
      'Enter coordinates (latitude,longitude):',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: async input => {
            if (!input) return;

            try {
              const coords = input.split(',');
              if (coords.length !== 2) {
                Alert.alert(
                  'Error',
                  'Please enter coordinates in format: latitude,longitude'
                );
                return;
              }

              const latitude = parseFloat(coords[0].trim());
              const longitude = parseFloat(coords[1].trim());

              if (isNaN(latitude) || isNaN(longitude)) {
                Alert.alert(
                  'Error',
                  'Please enter valid numbers for coordinates'
                );
                return;
              }

              if (
                latitude < -90 ||
                latitude > 90 ||
                longitude < -180 ||
                longitude > 180
              ) {
                Alert.alert('Error', 'Coordinates out of valid range');
                return;
              }

              const coordinate: Coordinate = { latitude, longitude };
              const locationName = `Custom ${savedLocations.length + 1}`;

              const result = await saveLocation(
                locationName,
                coordinate,
                `Custom location added on ${new Date().toLocaleDateString()}`
              );

              if (result) {
                Alert.alert(
                  'Success',
                  `Added "${locationName}" to your compass locations.`
                );
              } else {
                Alert.alert('Error', 'Failed to save custom location');
              }
            } catch (err) {
              Alert.alert('Error', 'Failed to parse coordinates');
            }
          },
        },
      ],
      'plain-text',
      '37.7749,-122.4194' // San Francisco as example
    );
  };

  const handleLocationPress = (location: SavedLocation) => {
    Alert.alert(
      'Location Options',
      `What would you like to do with "${location.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'View Details',
          onPress: () => {
            Alert.alert(
              location.name,
              `Coordinates: ${location.coordinate.latitude.toFixed(6)}, ${location.coordinate.longitude.toFixed(6)}\n\n${location.description || 'No description'}`
            );
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteLocation(location.id);
            if (!success) {
              setError('Failed to delete location');
            }
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Locations',
      'Are you sure you want to remove all saved locations?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllLocations();
            if (!success) {
              setError('Failed to clear all locations');
            }
          },
        },
      ]
    );
  };

  const handleViewCompass = () => {
    navigation.navigate('Compass');
  };

  // Loading state
  if (isLoading) {
    return <LoadingState message='Getting your location...' />;
  }

  // Error state
  if (error && !locationPermission) {
    return (
      <ErrorState
        title='Location Permission Required'
        message={`${error}\n\nLocation access is required to use the compass features. Please enable location permissions in your device settings.`}
        buttonText='Retry'
        onRetry={initializeLocation}
      />
    );
  }

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>🗺️ Location Manager</Text>
        <Text style={sharedStyles.subtitle}>
          Add locations to track with your compass
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {/* Current Location */}
          {currentLocation && (
            <CurrentLocationCard
              currentLocation={currentLocation}
              onAddCurrentLocation={addCurrentLocation}
            />
          )}

          {/* Quick Actions */}
          <QuickActions
            onAddCustomLocation={addCustomLocation}
            onViewCompass={handleViewCompass}
          />

          {/* Saved Locations */}
          <SavedLocationsList
            savedLocations={savedLocations}
            onLocationPress={handleLocationPress}
            onClearAll={handleClearAll}
          />

          {/* Status Info */}
          <StatusInfo debugInfo={debugInfo} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MapScreen;
