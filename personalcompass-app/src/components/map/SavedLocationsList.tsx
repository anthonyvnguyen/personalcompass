import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { SavedLocation } from '../../types/location';
import { sharedStyles } from '../../styles/shared';
import { LocationItem } from './LocationItem';
import { colors, spacing, typography, opacity } from '../../styles/tokens';

interface SavedLocationsListProps {
  savedLocations: SavedLocation[];
  onLocationPress: (location: SavedLocation) => void;
  onDeleteSelected: (locationIds: string[]) => void;
}

export const SavedLocationsList: React.FC<SavedLocationsListProps> = ({
  savedLocations,
  onLocationPress,
  onDeleteSelected,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
    setSelectedLocationIds([]);
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationIds(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedLocationIds.length > 0) {
      onDeleteSelected(selectedLocationIds);
      setSelectedLocationIds([]);
      setIsEditMode(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedLocationIds.length === savedLocations.length) {
      setSelectedLocationIds([]);
    } else {
      setSelectedLocationIds(savedLocations.map(location => location.id));
    }
  };

  return (
    <View style={sharedStyles.section}>
      <View style={styles.headerRow}>
        <Text size='2xl' weight='semibold' style={styles.sectionTitle}>
          Saved Locations{' '}
          {savedLocations.length > 0 && `(${savedLocations.length})`}
        </Text>
        {savedLocations.length > 0 && (
          <Button
            onPress={handleToggleEdit}
            variant='ghost'
            size='sm'
            style={styles.editButton}
          >
            <Text size='base' weight='semibold' style={styles.editButtonText}>
              {isEditMode ? 'Done' : 'Edit'}
            </Text>
          </Button>
        )}
      </View>

      {savedLocations.length === 0 ? (
        <Card>
          <CardContent centered>
            <Text variant='secondary' style={sharedStyles.emptyStateText}>
              No locations saved yet
            </Text>
            <Text variant='secondary' size='base' style={styles.emptySubtext}>
              Add custom coordinates to get started
            </Text>
          </CardContent>
        </Card>
      ) : (
        <View style={sharedStyles.listContainer}>
          {savedLocations.map(location => (
            <LocationItem
              key={location.id}
              location={location}
              isEditMode={isEditMode}
              isSelected={selectedLocationIds.includes(location.id)}
              onPress={
                isEditMode
                  ? () => handleLocationSelect(location.id)
                  : onLocationPress
              }
            />
          ))}

          {/* Edit Mode Actions */}
          {isEditMode && (
            <View style={styles.editActionsRow}>
              <Button
                onPress={handleSelectAll}
                variant='outline'
                style={styles.actionButton}
              >
                <Text size='lg' weight='semibold'>
                  {selectedLocationIds.length === savedLocations.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Text>
              </Button>

              <Button
                onPress={handleDeleteSelected}
                variant='destructive'
                style={[
                  styles.actionButton,
                  selectedLocationIds.length === 0 &&
                    sharedStyles.disabledButton,
                ]}
                disabled={selectedLocationIds.length === 0}
              >
                <Text
                  size='lg'
                  weight='semibold'
                  style={[
                    styles.destructiveText,
                    selectedLocationIds.length === 0 &&
                      styles.disabledButtonText,
                  ]}
                >
                  Delete ({selectedLocationIds.length})
                </Text>
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: spacing[4],
    letterSpacing: typography.letterSpacing.normal,
  },
  editButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minHeight: 36,
  },
  editButtonText: {
    color: colors.primary[500],
  },
  emptySubtext: {
    marginTop: spacing[2],
    textAlign: 'center',
  },
  editActions: {
    padding: spacing[5],
  },
  editActionsRow: {
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[2],
  },
  actionButton: {
    flex: 1,
  },
  destructiveText: {
    color: colors.neutral[0],
  },
  disabledButtonText: {
    opacity: opacity.disabled,
  },
});
