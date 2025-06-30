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
import { Button } from '../../../components/ui/button';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../../styles/shared';
import { colors } from '../../styles/tokens';

interface ErrorStateProps {
  title: string;
  message: string;
  buttonText: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  buttonText,
  onRetry,
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
        <Card style={styles.errorCard}>
          <CardHeader>
            <CardTitle style={styles.errorTitle}>{title}</CardTitle>
          </CardHeader>
          <CardContent style={sharedStyles.alignCenter}>
            <Text
              style={[sharedStyles.emptyStateText, sharedStyles.marginBottom16]}
            >
              {message}
            </Text>
            <Button
              onPress={onRetry}
              style={[styles.fullWidthButton, sharedStyles.primaryButton]}
            >
              <Text
                style={[sharedStyles.buttonText, { color: colors.neutral[0] }]}
              >
                {buttonText}
              </Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    width: '100%',
    maxWidth: 400,
  },
  errorTitle: {
    color: colors.error[500],
    textAlign: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
});
