import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { LocationIndicator } from '../../types/compass';

interface LocationIndicatorsListProps {
  indicators: LocationIndicator[];
}

export function LocationIndicatorsList({
  indicators,
}: LocationIndicatorsListProps) {
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No saved locations</Text>
        <Text style={styles.emptySubtext}>
          Add locations from the Map screen to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Indicators</Text>
      {indicators.map((indicator, index) => (
        <View key={indicator.id} style={styles.indicatorItem}>
          <View style={styles.indicatorRow}>
            <View style={styles.indicatorLeft}>
              <View
                style={[styles.colorDot, { backgroundColor: indicator.color }]}
              />
              <View style={styles.indicatorInfo}>
                <Text style={styles.locationName} numberOfLines={1}>
                  {indicator.name}
                </Text>
                <Text style={styles.locationDetails}>
                  {formatDistance(indicator.distance)} •{' '}
                  {getCardinalDirection(indicator.bearing)}
                </Text>
              </View>
            </View>
            <View style={styles.indicatorRight}>
              <Text style={styles.bearingText}>
                {formatBearing(indicator.bearing)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  indicatorItem: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  indicatorInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  locationDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  indicatorRight: {
    alignItems: 'flex-end',
  },
  bearingText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
