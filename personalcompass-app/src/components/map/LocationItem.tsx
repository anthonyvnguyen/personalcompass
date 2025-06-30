import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { SavedLocation } from '../../types/location';
import { useColorScheme } from '../../../lib/useColorScheme';

interface LocationItemProps {
  location: SavedLocation;
  isEditMode?: boolean;
  isSelected?: boolean;
  onPress: (location: SavedLocation) => void;
}

export const LocationItem: React.FC<LocationItemProps> = ({
  location,
  isEditMode = false,
  isSelected = false,
  onPress,
}) => {
  const { isDarkColorScheme } = useColorScheme();

  const handlePress = () => {
    onPress(location);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressablePressed,
      ]}
    >
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <View style={styles.mainContent}>
            <View style={styles.textContent}>
              <Text style={styles.locationName} numberOfLines={1}>
                {location.name}
              </Text>
              <Text
                style={[
                  styles.locationCoords,
                  isDarkColorScheme
                    ? styles.locationCoordsDark
                    : styles.locationCoordsLight,
                ]}
                numberOfLines={1}
              >
                {location.coordinate.latitude.toFixed(4)},{' '}
                {location.coordinate.longitude.toFixed(4)}
              </Text>
              {location.description && (
                <Text
                  style={[
                    styles.locationDescription,
                    isDarkColorScheme
                      ? styles.locationDescriptionDark
                      : styles.locationDescriptionLight,
                  ]}
                  numberOfLines={2}
                >
                  {location.description}
                </Text>
              )}
            </View>
            {isEditMode && (
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                    isDarkColorScheme
                      ? styles.checkboxDark
                      : styles.checkboxLight,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name='checkmark' size={16} color='#ffffff' />
                  )}
                </View>
              </View>
            )}
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    // No margins here - spacing controlled by parent container
  },
  pressablePressed: {
    opacity: 0.7,
  },
  card: {
    marginBottom: 0, // Override Card's default marginBottom: 20
  },
  cardContent: {
    padding: 16,
    paddingTop: 16, // Ensure consistent padding
    paddingBottom: 16, // Ensure consistent padding
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 0, // Prevent any minimum height expansion
  },
  textContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light blue
  },
  checkboxContainer: {
    marginLeft: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLight: {
    borderColor: '#d1d5db',
  },
  checkboxDark: {
    borderColor: '#4b5563',
  },
  checkboxSelected: {
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  locationCoords: {
    fontSize: 15,
    fontFamily: 'monospace',
    marginBottom: 2,
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  locationCoordsLight: {
    color: '#666666',
  },
  locationCoordsDark: {
    color: '#a1a1a1',
  },
  locationDescription: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 16,
    marginBottom: 0, // Explicitly set to 0
  },
  locationDescriptionLight: {
    color: '#888888',
  },
  locationDescriptionDark: {
    color: '#888888',
  },
});
