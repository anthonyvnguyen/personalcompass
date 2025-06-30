import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { SavedLocation } from '../../types/location';
import { useColorScheme } from '../../../lib/useColorScheme';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  opacity,
} from '../../styles/tokens';

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
      <Card>
        <CardContent size='md'>
          <View style={styles.mainContent}>
            <View style={styles.textContent}>
              <Text
                size='xl'
                weight='semibold'
                style={styles.locationName}
                numberOfLines={1}
              >
                {location.name}
              </Text>
              <Text
                variant='secondary'
                size='md'
                style={styles.locationCoords}
                numberOfLines={1}
              >
                {location.coordinate.latitude.toFixed(4)},{' '}
                {location.coordinate.longitude.toFixed(4)}
              </Text>
              {location.description && (
                <Text
                  variant='tertiary'
                  size='base'
                  style={styles.locationDescription}
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
                    <Ionicons
                      name='checkmark'
                      size={16}
                      color={colors.neutral[0]}
                    />
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
    opacity: opacity.subtle,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 0, // Prevent any minimum height expansion
  },
  textContent: {
    flex: 1,
    // Removed test background color
  },
  checkboxContainer: {
    marginLeft: spacing[4],
  },
  checkbox: {
    width: spacing[6],
    height: spacing[6],
    borderRadius: borderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLight: {
    borderColor: colors.neutral[300],
  },
  checkboxDark: {
    borderColor: colors.neutral[600],
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  locationName: {
    marginBottom: spacing[1],
    letterSpacing: typography.letterSpacing.wide,
    lineHeight: typography.lineHeight.relaxed,
  },
  locationCoords: {
    fontFamily: 'monospace',
    marginBottom: spacing[1],
    letterSpacing: typography.letterSpacing.wider,
    lineHeight: typography.lineHeight.snug,
  },
  locationDescription: {
    marginTop: spacing[1],
    lineHeight: typography.lineHeight.tight,
    marginBottom: 0, // Explicit 0 to prevent any margin
  },
});
