import React from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getStatusCardStyle } from '../../styles/shared';
import { colors } from '../../styles/tokens';

interface StatusItem {
  text: string;
}

interface StatusCardProps {
  items: StatusItem[];
}

export const StatusCard: React.FC<StatusCardProps> = ({ items }) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Card style={getStatusCardStyle(isDarkColorScheme)}>
      <CardContent>
        {items.map((item, index) => (
          <View key={index} style={sharedStyles.statusRow}>
            <View style={sharedStyles.statusIcon}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: isDarkColorScheme
                    ? colors.primary[500]
                    : colors.primary[700],
                }}
              />
            </View>
            <Text variant='secondary' style={sharedStyles.statusText}>
              {item.text}
            </Text>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};
