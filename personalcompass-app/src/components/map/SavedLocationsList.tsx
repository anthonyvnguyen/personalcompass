import React from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { SavedLocation } from '../../types/location';
import { sharedStyles } from '../../styles/shared';
import { LocationItem } from './LocationItem';

interface SavedLocationsListProps {
  savedLocations: SavedLocation[];
  onLocationPress: (location: SavedLocation) => void;
  onClearAll: () => void;
}

export const SavedLocationsList: React.FC<SavedLocationsListProps> = ({
  savedLocations,
  onLocationPress,
  onClearAll,
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>
        Saved Locations ({savedLocations.length})
      </Text>

      {savedLocations.length === 0 ? (
        <Card>
          <CardContent style={sharedStyles.cardContentCentered}>
            <Text style={sharedStyles.emptyStateText}>
              No locations saved yet.{'\n\n'}
              Add your current location or enter custom coordinates to get
              started.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <View style={sharedStyles.listContainer}>
          {savedLocations.map(location => (
            <LocationItem
              key={location.id}
              location={location}
              onPress={onLocationPress}
            />
          ))}

          {/* Clear All Button */}
          <CardContent style={sharedStyles.cardContentCentered}>
            <Button onPress={onClearAll} style={sharedStyles.destructiveButton}>
              <Text style={sharedStyles.destructiveButtonText}>
                Clear All Locations
              </Text>
            </Button>
          </CardContent>
        </View>
      )}
    </View>
  );
};
