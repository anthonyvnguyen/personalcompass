import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { CompassRing } from './CompassRing';
import { LocationIndicator } from '../../types/compass';
import { useColorScheme } from '../../../lib/useColorScheme';

interface CompassDisplayProps {
  heading: number;
  indicators: LocationIndicator[];
  accuracy: 'low' | 'medium' | 'high';
  size?: number;
}

export function CompassDisplay({
  heading,
  indicators,
  accuracy,
  size = 280,
}: CompassDisplayProps) {
  const { isDarkColorScheme } = useColorScheme();

  const formatHeading = (heading: number): string => {
    return `${Math.round(heading)}°`;
  };

  const getCardinalDirection = (heading: number): string => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(heading / 22.5) % 16;
    return directions[index];
  };

  const getAccuracyColor = (accuracy: 'low' | 'medium' | 'high'): string => {
    switch (accuracy) {
      case 'high':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getAccuracyText = (accuracy: 'low' | 'medium' | 'high'): string => {
    switch (accuracy) {
      case 'high':
        return 'High Accuracy';
      case 'medium':
        return 'Medium Accuracy';
      case 'low':
        return 'Low Accuracy';
      default:
        return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      {/* Compass Ring */}
      <View style={styles.compassContainer}>
        <CompassRing size={size} heading={heading} indicators={indicators} />

        {/* Cardinal Direction Overlay - shows current facing direction */}
        <View style={styles.headingOverlay}>
          <Text style={styles.cardinalDirection}>
            {getCardinalDirection(heading)}
          </Text>
        </View>
      </View>

      {/* Compass Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Heading</Text>
            <Text style={styles.infoValue}>
              {formatHeading(heading)} {getCardinalDirection(heading)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Accuracy</Text>
            <View style={styles.accuracyContainer}>
              <View
                style={[
                  styles.accuracyDot,
                  { backgroundColor: getAccuracyColor(accuracy) },
                ]}
              />
              <Text style={styles.infoValue}>{getAccuracyText(accuracy)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Locations</Text>
            <Text style={styles.infoValue}>
              {indicators.length} indicator{indicators.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValue}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  compassContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headingOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '60%', // Position below center to avoid red arrow
  },
  cardinalDirection: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.9,
  },
  infoContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  accuracyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accuracyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
});
