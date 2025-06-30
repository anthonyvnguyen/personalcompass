import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/text';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { useColorScheme } from '../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../styles/shared';
import { LoadingState, ErrorState } from '../components/common';
import { CompassDisplay, LocationIndicatorsList } from '../components/compass';
import { useCompass } from '../hooks/useCompass';
import { colors, spacing, typography } from '../styles/tokens';

function CompassScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const {
    heading,
    indicators,
    isCompassActive,
    error,
    accuracy,
    startCompass,
    stopCompass,
    refreshIndicators,
  } = useCompass();

  const [isStarting, setIsStarting] = useState(false);

  const handleStartCompass = async () => {
    setIsStarting(true);
    try {
      await startCompass();
    } catch (err) {
      Alert.alert('Error', 'Failed to start compass. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopCompass = () => {
    stopCompass();
  };

  const handleRefreshIndicators = async () => {
    try {
      await refreshIndicators();
    } catch (err) {
      Alert.alert('Error', 'Failed to refresh location indicators.');
    }
  };

  // Show loading state when starting compass
  if (isStarting) {
    return (
      <LoadingState message='Starting compass and initializing sensors...' />
    );
  }

  // Show error state if there's an error
  if (error && !isCompassActive) {
    return (
      <ErrorState
        title='Compass Error'
        message={error}
        buttonText='Try Again'
        onRetry={handleStartCompass}
      />
    );
  }

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View style={sharedStyles.header}>
        <Text size='4xl' weight='bold' style={sharedStyles.title}>
          Compass
        </Text>
        <Text size='lg' variant='secondary' style={sharedStyles.subtitle}>
          Dynamic compass with location indicators
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {!isCompassActive ? (
            // Compass not started - show start button
            <Card spacing='md'>
              <CardContent centered>
                <View style={styles.startContainer}>
                  <Text size='3xl' weight='bold' style={styles.startTitle}>
                    Start Compass
                  </Text>
                  <Text
                    size='lg'
                    variant='secondary'
                    style={styles.startDescription}
                  >
                    Tap the button below to activate the compass and see
                    directions to your saved locations.
                  </Text>
                  <Button
                    onPress={handleStartCompass}
                    style={styles.startButton}
                  >
                    <Text
                      size='lg'
                      weight='semibold'
                      style={{ color: colors.neutral[0] }}
                    >
                      Start Compass
                    </Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          ) : (
            // Compass is active - show compass display
            <>
              <Card spacing='md'>
                <CardContent centered>
                  <CompassDisplay
                    heading={heading}
                    indicators={indicators}
                    accuracy={accuracy}
                    size={280}
                  />
                </CardContent>
              </Card>

              {/* Location Indicators List */}
              <Card spacing='md'>
                <CardContent>
                  <LocationIndicatorsList indicators={indicators} />
                </CardContent>
              </Card>

              {/* Control Buttons */}
              <Card spacing='md'>
                <CardContent>
                  <View style={styles.controlsContainer}>
                    <Button
                      onPress={handleRefreshIndicators}
                      variant='outline'
                      style={styles.controlButton}
                    >
                      <Text size='lg' weight='semibold'>
                        Refresh
                      </Text>
                    </Button>
                    <Button
                      onPress={handleStopCompass}
                      variant='destructive'
                      style={styles.controlButton}
                    >
                      <Text
                        size='lg'
                        weight='semibold'
                        style={{ color: colors.neutral[0] }}
                      >
                        Stop Compass
                      </Text>
                    </Button>
                  </View>
                </CardContent>
              </Card>
            </>
          )}

          {/* Help Information */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.helpContainer}>
                <Text size='md' variant='secondary' style={styles.helpText}>
                  • The compass shows your current heading and directions to
                  saved locations
                </Text>
                <Text size='md' variant='secondary' style={styles.helpText}>
                  • Each saved location appears as a colored indicator on the
                  compass ring
                </Text>
                <Text size='md' variant='secondary' style={styles.helpText}>
                  • Location indicators show distance and cardinal direction
                </Text>
                <Text size='md' variant='secondary' style={styles.helpText}>
                  • Add more locations from the Map screen to see them here
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    alignItems: 'center',
    paddingVertical: spacing[10],
  },
  startTitle: {
    marginBottom: spacing[3],
    letterSpacing: typography.letterSpacing.tight,
  },
  startDescription: {
    textAlign: 'center',
    marginBottom: spacing[8],
    lineHeight: 22,
  },
  startButton: {
    minWidth: 200,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: spacing[4],
    justifyContent: 'center',
  },
  controlButton: {
    flex: 1,
    maxWidth: 140,
  },
  helpContainer: {
    gap: spacing[3],
  },
  helpText: {
    lineHeight: 20,
  },
});

export default CompassScreen;
