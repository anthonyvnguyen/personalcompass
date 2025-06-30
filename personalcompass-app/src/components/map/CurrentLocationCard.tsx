import React from 'react';
import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { Coordinate } from '../../types/location';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getCoordinateContainerStyle } from '../../styles/shared';

interface CurrentLocationCardProps {
  currentLocation: Coordinate;
  onAddCurrentLocation: () => void;
}

export const CurrentLocationCard: React.FC<CurrentLocationCardProps> = ({
  currentLocation,
  onAddCurrentLocation,
}) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Card style={sharedStyles.cardSpacing}>
      <CardHeader>
        <CardTitle>📍 Your Current Location</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={getCoordinateContainerStyle(isDarkColorScheme)}>
          <Text style={sharedStyles.coordinateText}>
            Lat: {currentLocation.latitude.toFixed(6)}
          </Text>
          <Text style={sharedStyles.coordinateText}>
            Lng: {currentLocation.longitude.toFixed(6)}
          </Text>
        </View>
        <Button
          onPress={onAddCurrentLocation}
          style={sharedStyles.primaryButton}
        >
          <Text style={sharedStyles.buttonText}>+ Add Current Location</Text>
        </Button>
      </CardContent>
    </Card>
  );
};
