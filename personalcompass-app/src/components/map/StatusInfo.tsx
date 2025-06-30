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
    { icon: '📱', text: 'Mode: Expo Go Compatible (No visual map)' },
    { icon: '🧭', text: 'All locations work with the compass screen' },
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
          <Text style={{ fontSize: 12, color: '#dc2626' }}>{error}</Text>
        </View>
      )}
    </>
  );
};
