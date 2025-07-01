import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { LocationIndicator } from '../../types/compass';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getTextColor } from '../../styles/shared';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  opacity,
} from '../../styles/tokens';

interface LocationIndicatorsListProps {
  indicators: LocationIndicator[];
}

export function LocationIndicatorsList({
  indicators,
}: LocationIndicatorsListProps) {
  const { isDarkColorScheme } = useColorScheme();

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${distance}m`;
    } else if (distance < 10000) {
      return `${(distance / 1000).toFixed(1)}km`;
    } else {
      return `${Math.round(distance / 1000)}km`;
    }
  };

  const formatBearing = (bearing: number): string => {
    return `${Math.round(bearing)}°`;
  };

  const getCardinalDirection = (bearing: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  if (indicators.length === 0) {
    return (
      <View style={sharedStyles.center}>
        <Text
          size='xl'
          weight='medium'
          style={[
            sharedStyles.emptyStateText,
            { color: getTextColor('primary', isDarkColorScheme) },
          ]}
        >
          No saved locations
        </Text>
        <Text
          size='lg'
          variant='secondary'
          style={[sharedStyles.emptyStateText, { marginTop: spacing[2] }]}
        >
          Add locations from the Map screen to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        size='2xl'
        weight='semibold'
        style={[
          sharedStyles.sectionTitle,
          { color: getTextColor('primary', isDarkColorScheme) },
        ]}
      >
        Location Indicators
      </Text>
      <View style={sharedStyles.listContainer}>
        {indicators.map((indicator, index) => (
          <View
            key={indicator.id}
            style={[
              styles.indicatorItem,
              isDarkColorScheme
                ? styles.indicatorItemDark
                : styles.indicatorItemLight,
            ]}
          >
            <View style={sharedStyles.rowSpaceBetween}>
              <View style={sharedStyles.rowCenter}>
                <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: indicator.color },
                  ]}
                />
                <View style={styles.indicatorInfo}>
                  <Text
                    size='xl'
                    weight='medium'
                    style={[
                      styles.locationName,
                      { color: getTextColor('primary', isDarkColorScheme) },
                    ]}
                    numberOfLines={1}
                  >
                    {indicator.name}
                  </Text>
                  <Text
                    size='lg'
                    variant='secondary'
                    style={styles.locationDetails}
                  >
                    {formatDistance(indicator.distance)} •{' '}
                    {getCardinalDirection(indicator.bearing)}
                  </Text>
                </View>
              </View>
              <View style={sharedStyles.alignCenter}>
                <Text
                  size='xl'
                  weight='medium'
                  style={[
                    sharedStyles.coordinateText,
                    { color: getTextColor('primary', isDarkColorScheme) },
                  ]}
                >
                  {formatBearing(indicator.bearing)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[5],
  },
  indicatorItem: {
    padding: spacing[4],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
  },
  indicatorItemLight: {
    backgroundColor: colors.neutral[50],
    borderColor: colors.neutral[200],
  },
  indicatorItemDark: {
    backgroundColor: colors.neutral[800],
    borderColor: colors.neutral[700],
  },
  colorDot: {
    width: spacing[3],
    height: spacing[3],
    borderRadius: spacing[2],
    marginRight: spacing[3],
  },
  indicatorInfo: {
    flex: 1,
  },
  locationName: {
    marginBottom: spacing[1],
    letterSpacing: typography.letterSpacing.normal,
  },
  locationDetails: {
    lineHeight: typography.lineHeight.snug,
  },
});
