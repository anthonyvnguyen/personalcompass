import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useColorScheme } from '../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../styles/shared';
import { StatusCard } from '../components/common';
import { colors, spacing, typography } from '../styles/tokens';

function SettingsScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View style={sharedStyles.header}>
        <Text size='4xl' weight='bold' style={sharedStyles.title}>
          Settings
        </Text>
        <Text size='lg' variant='secondary' style={sharedStyles.subtitle}>
          App preferences and configuration
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {/* Appearance Section */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Theme, colors, and display options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeToggle />
            </CardContent>
          </Card>

          {/* Compass Section */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>Compass</CardTitle>
              <CardDescription>
                Calibration, units, and accuracy settings
              </CardDescription>
            </CardHeader>
            <CardContent centered>
              <Text variant='secondary' style={styles.comingSoonText}>
                Coming soon
              </Text>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Permissions and location services
              </CardDescription>
            </CardHeader>
            <CardContent centered>
              <Text variant='secondary' style={styles.comingSoonText}>
                Coming soon
              </Text>
            </CardContent>
          </Card>

          {/* Data Section */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>Data</CardTitle>
              <CardDescription>
                Manage saved locations and app data
              </CardDescription>
            </CardHeader>
            <CardContent centered>
              <Text variant='secondary' style={styles.comingSoonText}>
                Coming soon
              </Text>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card spacing='md'>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>App version, help, and support</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={sharedStyles.listContainer}>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text size='lg' weight='semibold' style={styles.infoLabel}>
                    Version:
                  </Text>
                  <Text size='lg' variant='secondary' style={styles.infoValue}>
                    1.0.0
                  </Text>
                </View>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text size='lg' weight='semibold' style={styles.infoLabel}>
                    Build:
                  </Text>
                  <Text size='lg' variant='secondary' style={styles.infoValue}>
                    MVP
                  </Text>
                </View>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text size='lg' weight='semibold' style={styles.infoLabel}>
                    Platform:
                  </Text>
                  <Text size='lg' variant='secondary' style={styles.infoValue}>
                    Expo Go
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Status Info */}
          <StatusCard
            items={[
              {
                text: 'Most settings are coming in future updates',
              },
              {
                text: 'Currently focused on core compass functionality',
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  comingSoonText: {
    fontStyle: 'italic',
    opacity: 0.6,
  },
  infoLabel: {
    // Styles handled by Text component props
  },
  infoValue: {
    fontFamily: 'monospace',
  },
});

export default SettingsScreen;
