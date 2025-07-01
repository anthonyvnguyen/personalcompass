import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { CompassRing } from './CompassRing';
import { LocationIndicator } from '../../types/compass';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getTextColor } from '../../styles/shared';
import { colors, spacing, typography, opacity } from '../../styles/tokens';

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
        return colors.success[500];
      case 'medium':
        return colors.warning[500];
      case 'low':
        return colors.error[500];
      default:
        return colors.neutral[500];
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
    <View style={sharedStyles.center}>
      {/* Compass Ring */}
      <View style={styles.compassContainer}>
        <CompassRing size={size} heading={heading} locations={indicators} />

        {/* Cardinal Direction Overlay - shows current facing direction */}
        <View style={styles.headingOverlay}>
          <Text
            size='3xl'
            weight='bold'
            style={[
              styles.cardinalDirection,
              { color: getTextColor('primary', isDarkColorScheme) },
            ]}
          >
            {getCardinalDirection(heading)}
          </Text>
        </View>
      </View>

      {/* Compass Info */}
      <View style={styles.infoContainer}>
        <View style={sharedStyles.rowSpaceBetween}>
          <View style={sharedStyles.alignCenter}>
            <Text
              size='sm'
              weight='medium'
              style={[
                styles.infoLabel,
                { color: getTextColor('secondary', isDarkColorScheme) },
              ]}
            >
              HEADING
            </Text>
            <Text
              size='lg'
              weight='medium'
              style={[
                sharedStyles.coordinateText,
                { color: getTextColor('primary', isDarkColorScheme) },
              ]}
            >
              {formatHeading(heading)} {getCardinalDirection(heading)}
            </Text>
          </View>

          <View style={sharedStyles.alignCenter}>
            <Text
              size='sm'
              weight='medium'
              style={[
                styles.infoLabel,
                { color: getTextColor('secondary', isDarkColorScheme) },
              ]}
            >
              ACCURACY
            </Text>
            <View style={sharedStyles.rowCenter}>
              <View
                style={[
                  styles.accuracyDot,
                  { backgroundColor: getAccuracyColor(accuracy) },
                ]}
              />
              <Text
                size='lg'
                weight='medium'
                style={{ color: getTextColor('primary', isDarkColorScheme) }}
              >
                {getAccuracyText(accuracy)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[sharedStyles.rowSpaceBetween, { marginTop: spacing[4] }]}>
          <View style={sharedStyles.alignCenter}>
            <Text
              size='sm'
              weight='medium'
              style={[
                styles.infoLabel,
                { color: getTextColor('secondary', isDarkColorScheme) },
              ]}
            >
              LOCATIONS
            </Text>
            <Text
              size='lg'
              weight='medium'
              style={{ color: getTextColor('primary', isDarkColorScheme) }}
            >
              {indicators.length} indicator{indicators.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <View style={sharedStyles.alignCenter}>
            <Text
              size='sm'
              weight='medium'
              style={[
                styles.infoLabel,
                { color: getTextColor('secondary', isDarkColorScheme) },
              ]}
            >
              STATUS
            </Text>
            <Text
              size='lg'
              weight='medium'
              style={{ color: colors.success[500] }}
            >
              Active
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    opacity: opacity.visible,
  },
  infoContainer: {
    marginTop: spacing[6],
    paddingHorizontal: spacing[5],
    width: '100%',
  },
  infoLabel: {
    marginBottom: spacing[1],
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  },
  accuracyDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: spacing[1],
    marginRight: spacing[2],
  },
});
