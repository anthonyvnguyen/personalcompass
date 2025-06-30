import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, Polygon } from 'react-native-svg';
import { LocationIndicator } from '../../types/compass';
import { useColorScheme } from '../../../lib/useColorScheme';

interface CompassRingProps {
  size: number;
  heading: number;
  indicators: LocationIndicator[];
}

export function CompassRing({ size, heading, indicators }: CompassRingProps) {
  const { isDarkColorScheme } = useColorScheme();
  const center = size / 2;
  const radius = size / 2 - 20;
  const innerRadius = radius - 30;

  // Theme colors
  const ringColor = isDarkColorScheme ? '#4A5568' : '#E2E8F0';
  const textColor = isDarkColorScheme ? '#F7FAFC' : '#2D3748';
  const northColor = '#EF4444';

  // Generate degree markings
  const generateMarkings = () => {
    const markings = [];

    for (let i = 0; i < 360; i += 30) {
      const angle = (i - 90) * (Math.PI / 180); // -90 to start from north
      const isCardinal = i % 90 === 0;
      const markRadius = isCardinal ? radius - 15 : radius - 10;

      const x1 = center + radius * Math.cos(angle);
      const y1 = center + radius * Math.sin(angle);
      const x2 = center + markRadius * Math.cos(angle);
      const y2 = center + markRadius * Math.sin(angle);

      markings.push(
        <Line
          key={`mark-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isCardinal ? northColor : ringColor}
          strokeWidth={isCardinal ? 3 : 1}
        />
      );

      // Add cardinal direction labels
      if (i % 90 === 0) {
        const labelRadius = radius - 25;
        const labelX = center + labelRadius * Math.cos(angle);
        const labelY = center + labelRadius * Math.sin(angle);

        let label = '';
        switch (i) {
          case 0:
            label = 'N';
            break;
          case 90:
            label = 'E';
            break;
          case 180:
            label = 'S';
            break;
          case 270:
            label = 'W';
            break;
        }

        markings.push(
          <SvgText
            key={`label-${i}`}
            x={labelX}
            y={labelY}
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize='16'
            fontWeight='bold'
            fill={i === 0 ? northColor : textColor}
          >
            {label}
          </SvgText>
        );
      }
    }

    return markings;
  };

  // Generate location indicators
  const generateIndicators = () => {
    return indicators.map(indicator => {
      // Calculate relative bearing (bearing relative to current heading)
      let relativeBearing = indicator.bearing - heading;

      // Normalize to -180 to 180 degrees
      if (relativeBearing > 180) {
        relativeBearing -= 360;
      } else if (relativeBearing < -180) {
        relativeBearing += 360;
      }

      const angle = (relativeBearing - 90) * (Math.PI / 180); // -90 to start from north
      const indicatorRadius = radius - 5;

      const x = center + indicatorRadius * Math.cos(angle);
      const y = center + indicatorRadius * Math.sin(angle);

      // Create arrow pointing to location
      const arrowSize = 8;
      const arrowAngle = angle + Math.PI / 2; // Perpendicular to radius

      const arrowPoints = [
        `${x},${y}`, // tip
        `${x - arrowSize * Math.cos(arrowAngle - 0.5)},${y - arrowSize * Math.sin(arrowAngle - 0.5)}`,
        `${x - arrowSize * Math.cos(arrowAngle + 0.5)},${y - arrowSize * Math.sin(arrowAngle + 0.5)}`,
      ].join(' ');

      return (
        <Polygon
          key={indicator.id}
          points={arrowPoints}
          fill={indicator.color}
          stroke={isDarkColorScheme ? '#000' : '#FFF'}
          strokeWidth={1}
        />
      );
    });
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Outer ring */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke={ringColor}
          strokeWidth={2}
        />

        {/* Inner ring */}
        <Circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill='none'
          stroke={ringColor}
          strokeWidth={1}
        />

        {/* Degree markings and labels */}
        {generateMarkings()}

        {/* Location indicators */}
        {generateIndicators()}

        {/* Center dot */}
        <Circle cx={center} cy={center} r={4} fill={textColor} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
