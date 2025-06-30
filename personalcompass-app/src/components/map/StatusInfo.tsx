import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components/ui/text';
import { useColorScheme } from '../../../lib/useColorScheme';
import {
  sharedStyles,
  getDebugContainerStyle,
  getErrorContainerStyle,
} from '../../styles/shared';
import { StatusCard } from '../common/StatusCard';

interface StatusInfoProps {
  debugInfo?: string;
  error?: string;
}

export const StatusInfo: React.FC<StatusInfoProps> = ({ debugInfo, error }) => {
  const { isDarkColorScheme } = useColorScheme();

  const statusItems = [
    { text: 'Mode: Expo Go Compatible (No visual map)' },
    { text: 'All locations work with the compass screen' },
  ];

  return (
    <>
      <StatusCard items={statusItems} />
      {debugInfo && (
        <View style={getDebugContainerStyle(isDarkColorScheme)}>
          <Text style={sharedStyles.debugText}>{debugInfo}</Text>
        </View>
      )}
      {error && (
        <View style={getErrorContainerStyle(isDarkColorScheme)}>
          <Text style={[sharedStyles.debugText, { color: '#ef4444' }]}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
};
