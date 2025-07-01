import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Line,
  Text as SvgText,
  Polygon,
  G,
} from 'react-native-svg';
import { LocationIndicator } from '../../types/compass';
import { useColorScheme } from '../../../lib/useColorScheme';
import { colors, opacity } from '../../styles/tokens';

interface CompassRingProps {
  size: number;
  heading: number;
  locations: Array<{
    id: string;
    name: string;
    bearing: number;
    distance: number;
    color: string;
  }>;
}

export const CompassRing: React.FC<CompassRingProps> = ({
  size,
  heading,
  locations,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const center = size / 2;
  const radius = size / 2 - 20;
  const innerRadius = radius - 30;

  // Use design tokens for colors
  const ringColor = isDarkColorScheme
    ? colors.neutral[600]
    : colors.neutral[300];
  const textColor = isDarkColorScheme
    ? colors.text.primary.dark
    : colors.text.primary.light;
  const northColor = colors.error[500];

  const renderCompassMarks = () => {
    const marks = [];
    const cardinalDirections = ['N', 'E', 'S', 'W'];

    for (let i = 0; i < 360; i += 30) {
      const angle = (i - 90) * (Math.PI / 180);
      const x1 = center + (radius - 10) * Math.cos(angle);
      const y1 = center + (radius - 10) * Math.sin(angle);
      const x2 = center + radius * Math.cos(angle);
      const y2 = center + radius * Math.sin(angle);

      marks.push(
        <Line
          key={`mark-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={ringColor}
          strokeWidth={i % 90 === 0 ? 2 : 1}
        />
      );

      // Add cardinal direction labels
      if (i % 90 === 0) {
        const labelRadius = radius - 25;
        const labelX = center + labelRadius * Math.cos(angle);
        const labelY = center + labelRadius * Math.sin(angle);
        const direction = cardinalDirections[i / 90];

        marks.push(
          <SvgText
            key={`label-${i}`}
            x={labelX}
            y={labelY}
            textAnchor='middle'
            alignmentBaseline='middle'
            fill={direction === 'N' ? northColor : textColor}
            fontSize='16'
            fontWeight='bold'
          >
            {direction}
          </SvgText>
        );
      }
    }

    return marks;
  };

  const renderDegreeMarks = () => {
    const marks = [];

    for (let i = 0; i < 360; i += 10) {
      if (i % 30 !== 0) {
        const angle = (i - 90) * (Math.PI / 180);
        const x1 = center + (radius - 5) * Math.cos(angle);
        const y1 = center + (radius - 5) * Math.sin(angle);
        const x2 = center + radius * Math.cos(angle);
        const y2 = center + radius * Math.sin(angle);

        marks.push(
          <Line
            key={`degree-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={ringColor}
            strokeWidth={0.5}
          />
        );
      }
    }

    return marks;
  };

  const renderLocationIndicators = () => {
    return locations.map(location => {
      // Calculate the visual bearing relative to device heading
      const visualBearing = (location.bearing - heading + 360) % 360;
      const angle = (visualBearing - 90) * (Math.PI / 180);

      // Position indicator on the compass ring
      const indicatorRadius = radius - 35;
      const x = center + indicatorRadius * Math.cos(angle);
      const y = center + indicatorRadius * Math.sin(angle);

      // Create arrow pointing outward
      const arrowSize = 8;
      const arrowAngle = visualBearing * (Math.PI / 180);

      const arrowX1 = x + arrowSize * Math.cos(arrowAngle);
      const arrowY1 = y + arrowSize * Math.sin(arrowAngle);
      const arrowX2 = x + arrowSize * Math.cos(arrowAngle + 2.4);
      const arrowY2 = y + arrowSize * Math.sin(arrowAngle + 2.4);
      const arrowX3 = x + arrowSize * Math.cos(arrowAngle - 2.4);
      const arrowY3 = y + arrowSize * Math.sin(arrowAngle - 2.4);

      return (
        <React.Fragment key={location.id}>
          {/* Direction line */}
          <Line
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke={location.color}
            strokeWidth={2}
            opacity={opacity.muted}
          />
          {/* Location indicator circle */}
          <Circle cx={x} cy={y} r={6} fill={location.color} />
          {/* Arrow pointing to location */}
          <Line
            x1={arrowX1}
            y1={arrowY1}
            x2={arrowX2}
            y2={arrowY2}
            stroke={isDarkColorScheme ? colors.neutral[0] : colors.neutral[950]}
            strokeWidth={2}
          />
          <Line
            x1={arrowX1}
            y1={arrowY1}
            x2={arrowX3}
            y2={arrowY3}
            stroke={isDarkColorScheme ? colors.neutral[0] : colors.neutral[950]}
            strokeWidth={2}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Rotating compass ring - rotates to show current direction at top */}
        <G transform={`rotate(${-heading} ${center} ${center})`}>
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

          {/* Compass marks and labels */}
          {renderCompassMarks()}
          {renderDegreeMarks()}
        </G>

        {/* Location indicators */}
        {renderLocationIndicators()}

        {/* Device heading indicator - always points to top of screen */}
        <Line
          x1={center}
          y1={center}
          x2={center}
          y2={center - innerRadius + 15}
          stroke={northColor}
          strokeWidth={3}
          strokeLinecap='round'
        />
        <Polygon
          points={`${center},${center - innerRadius + 10} ${center - 4},${center - innerRadius + 20} ${center + 4},${center - innerRadius + 20}`}
          fill={northColor}
        />

        {/* Center dot */}
        <Circle cx={center} cy={center} r={4} fill={textColor} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
