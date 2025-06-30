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

function SettingsScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>⚙️ Settings</Text>
        <Text style={sharedStyles.subtitle}>
          App preferences and configuration
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {/* Appearance Section */}
          <Card style={sharedStyles.cardSpacing}>
            <CardHeader>
              <CardTitle>🎨 Appearance</CardTitle>
              <CardDescription>
                Theme, colors, and display options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeToggle />
            </CardContent>
          </Card>

          {/* Compass Section */}
          <Card style={sharedStyles.cardSpacing}>
            <CardHeader>
              <CardTitle>🧭 Compass</CardTitle>
              <CardDescription>
                Calibration, units, and accuracy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={sharedStyles.cardContentCentered}>
                <Text style={styles.comingSoonText}>Coming soon</Text>
              </View>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card style={sharedStyles.cardSpacing}>
            <CardHeader>
              <CardTitle>📍 Location</CardTitle>
              <CardDescription>
                Permissions and location services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={sharedStyles.cardContentCentered}>
                <Text style={styles.comingSoonText}>Coming soon</Text>
              </View>
            </CardContent>
          </Card>

          {/* Data Section */}
          <Card style={sharedStyles.cardSpacing}>
            <CardHeader>
              <CardTitle>💾 Data</CardTitle>
              <CardDescription>
                Manage saved locations and app data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={sharedStyles.cardContentCentered}>
                <Text style={styles.comingSoonText}>Coming soon</Text>
              </View>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card style={sharedStyles.cardSpacing}>
            <CardHeader>
              <CardTitle>ℹ️ About</CardTitle>
              <CardDescription>App version, help, and support</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={sharedStyles.listContainer}>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text style={styles.infoLabel}>Version:</Text>
                  <Text style={styles.infoValue}>1.0.0</Text>
                </View>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text style={styles.infoLabel}>Build:</Text>
                  <Text style={styles.infoValue}>MVP</Text>
                </View>
                <View style={sharedStyles.rowSpaceBetween}>
                  <Text style={styles.infoLabel}>Platform:</Text>
                  <Text style={styles.infoValue}>Expo Go</Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Status Info */}
          <StatusCard
            items={[
              {
                icon: '🚧',
                text: 'Most settings are coming in future updates',
              },
              {
                icon: '🎯',
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
    fontSize: 14,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    opacity: 0.7,
  },
});

export default SettingsScreen;
