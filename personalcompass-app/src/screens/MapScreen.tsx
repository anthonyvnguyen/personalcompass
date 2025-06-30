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

  const addCustomLocation = () => {
    Alert.prompt(
      'Add Custom Location',
      'Enter coordinates (latitude,longitude):\n\nNote: Use negative values for:\n• West longitude (Americas: -180 to 0)\n• South latitude (Southern Hemisphere: -90 to 0)\n\nExamples:\n• New York: 40.68, -74.04\n• London: 51.51, -0.13\n• Sydney: -33.87, 151.21',
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
                  'Please enter coordinates in format: latitude,longitude\n\nExample: 40.68, -74.04'
                );
                return;
              }

              const latitude = parseFloat(coords[0].trim());
              const longitude = parseFloat(coords[1].trim());

              if (isNaN(latitude) || isNaN(longitude)) {
                Alert.alert(
                  'Error',
                  'Please enter valid numbers for coordinates\n\nExample: 40.68, -74.04'
                );
                return;
              }

              if (
                latitude < -90 ||
                latitude > 90 ||
                longitude < -180 ||
                longitude > 180
              ) {
                Alert.alert(
                  'Error',
                  'Coordinates out of valid range:\n• Latitude: -90 to 90\n• Longitude: -180 to 180'
                );
                return;
              }

              // Additional helpful validation for common mistakes
              const coordinate: Coordinate = { latitude, longitude };

              // Calculate distance from current location to provide context
              if (currentLocation) {
                const LocationService =
                  require('../services/locationService').default;
                const locationService = LocationService.getInstance();
                const distance = locationService.calculateDistance(
                  currentLocation,
                  coordinate
                );
                const distanceKm = Math.round(distance / 1000);

                // Warn if distance seems unusually large (>15,000 km)
                if (distanceKm > 15000) {
                  Alert.alert(
                    'Distance Check',
                    `This location is ${distanceKm.toLocaleString()} km away. This seems very far.\n\nDid you mean to use negative longitude for Western locations?\n(e.g., -74.04 instead of 74.04 for Eastern US)`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Add Anyway',
                        onPress: () =>
                          saveCustomLocation(
                            coordinate,
                            `Custom ${savedLocations.length + 1}`
                          ),
                      },
                    ]
                  );
                  return;
                }
              }

              await saveCustomLocation(
                coordinate,
                `Custom ${savedLocations.length + 1}`
              );
            } catch (err) {
              Alert.alert('Error', 'Failed to parse coordinates');
            }
          },
        },
      ],
      'plain-text',
      ''
    );
  };

  const saveCustomLocation = async (
    coordinate: Coordinate,
    locationName: string
  ) => {
    try {
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
      Alert.alert('Error', 'Failed to save location');
    }
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

  const handleDeleteSelected = async (locationIds: string[]) => {
    if (locationIds.length === 0) return;

    const locationNames = savedLocations
      .filter(location => locationIds.includes(location.id))
      .map(location => location.name)
      .join(', ');

    Alert.alert(
      'Delete Locations',
      `Are you sure you want to delete ${locationIds.length} location${locationIds.length > 1 ? 's' : ''}?\n\n${locationNames}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete all selected locations
              const promises = locationIds.map(id => deleteLocation(id));
              const results = await Promise.all(promises);

              // Check if any deletion failed
              const failedCount = results.filter(result => !result).length;
              if (failedCount > 0) {
                setError(
                  `Failed to delete ${failedCount} location${failedCount > 1 ? 's' : ''}`
                );
              }
            } catch (err) {
              setError('Failed to delete selected locations');
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
        <Text style={sharedStyles.title}>Location Manager</Text>
        <Text style={sharedStyles.subtitle}>
          Add locations to track with your compass
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {/* Quick Actions */}
          <QuickActions
            onAddCustomLocation={addCustomLocation}
            onViewCompass={handleViewCompass}
          />

          {/* Saved Locations */}
          <SavedLocationsList
            savedLocations={savedLocations}
            onLocationPress={handleLocationPress}
            onDeleteSelected={handleDeleteSelected}
          />

          {/* Status Info */}
          <StatusInfo debugInfo={debugInfo} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MapScreen;
