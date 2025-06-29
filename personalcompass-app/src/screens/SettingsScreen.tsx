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

function SettingsScreen() {
  const { isDarkColorScheme } = useColorScheme();

  const containerStyle = [
    styles.container,
    isDarkColorScheme ? styles.containerDark : styles.containerLight,
  ];

  return (
    <SafeAreaView style={containerStyle} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                isDarkColorScheme ? styles.titleDark : styles.titleLight,
              ]}
            >
              Settings
            </Text>
            <Text
              style={[
                styles.subtitle,
                isDarkColorScheme ? styles.subtitleDark : styles.subtitleLight,
              ]}
            >
              App preferences and configuration
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <Card>
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

            <Card>
              <CardHeader>
                <CardTitle>🧭 Compass</CardTitle>
                <CardDescription>
                  Calibration, units, and accuracy settings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📍 Location</CardTitle>
                <CardDescription>
                  Permissions and location services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💾 Data</CardTitle>
                <CardDescription>
                  Manage saved locations and app data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ℹ️ About</CardTitle>
                <CardDescription>
                  App version, help, and support
                </CardDescription>
              </CardHeader>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleLight: {
    color: '#333333',
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  subtitleLight: {
    color: '#666666',
  },
  subtitleDark: {
    color: '#a1a1a1',
  },
  cardContainer: {
    gap: 16,
  },
});

export default SettingsScreen;
