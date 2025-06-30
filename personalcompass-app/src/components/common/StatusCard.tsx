import React from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getStatusCardStyle } from '../../styles/shared';

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
                  backgroundColor: isDarkColorScheme ? '#a855f7' : '#7c3aed',
                }}
              />
            </View>
            <Text style={sharedStyles.statusText}>{item.text}</Text>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};
