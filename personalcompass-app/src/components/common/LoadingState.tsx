import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Text } from '../../../components/ui/text';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../../styles/shared';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
}) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      <View
        style={[
          sharedStyles.flex1,
          sharedStyles.center,
          sharedStyles.paddingHorizontal16,
        ]}
      >
        <Card style={styles.loadingCard}>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={sharedStyles.emptyStateText}>{message}</Text>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingCard: {
    width: '100%',
    maxWidth: 320,
  },
});
