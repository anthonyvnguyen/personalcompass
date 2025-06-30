import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { SavedLocation } from '../../types/location';
import { sharedStyles } from '../../styles/shared';

interface LocationItemProps {
  location: SavedLocation;
  onPress: (location: SavedLocation) => void;
}

export const LocationItem: React.FC<LocationItemProps> = ({
  location,
  onPress,
}) => {
  return (
    <Card style={sharedStyles.listItem}>
      <CardContent style={styles.locationCardContent}>
        <Pressable
          onPress={() => onPress(location)}
          style={styles.locationPressable}
        >
          <View style={styles.locationTextContainer}>
            <Text
              style={styles.locationName}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {location.name}
            </Text>
            <Text
              style={styles.locationCoords}
              numberOfLines={1}
              ellipsizeMode='middle'
            >
              {location.coordinate.latitude.toFixed(4)},{' '}
              {location.coordinate.longitude.toFixed(4)}
            </Text>
            {location.description && (
              <Text
                style={styles.locationDescription}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {location.description}
              </Text>
            )}
          </View>
        </Pressable>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  locationCardContent: {
    padding: 16,
    width: '100%',
    flex: 1,
  },
  locationPressable: {
    width: '100%',
  },
  locationTextContainer: {
    flex: 1,
    width: '100%',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    flexShrink: 1,
  },
  locationCoords: {
    fontSize: 14,
    fontFamily: 'monospace',
    opacity: 0.7,
    marginBottom: 2,
    flexShrink: 1,
  },
  locationDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    lineHeight: 16,
    flexShrink: 1,
  },
});
