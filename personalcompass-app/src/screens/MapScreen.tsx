import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { useColorScheme } from '~/lib/useColorScheme';

function MapScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkColorScheme ? styles.containerDark : styles.containerLight,
      ]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              isDarkColorScheme ? styles.titleDark : styles.titleLight,
            ]}
          >
            Map Screen
          </Text>
          <Text
            style={[
              styles.subtitle,
              isDarkColorScheme ? styles.subtitleDark : styles.subtitleLight,
            ]}
          >
            Interactive map for selecting locations
          </Text>
        </View>

        <Card style={styles.card}>
          <CardHeader style={styles.cardHeader}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>🗺️</Text>
            </View>
            <CardDescription style={styles.description}>
              Map will be implemented here
            </CardDescription>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <Text
              style={[
                styles.features,
                isDarkColorScheme ? styles.featuresDark : styles.featuresLight,
              ]}
            >
              • Tap to drop pins{'\n'}• View current location{'\n'}• Manage
              saved locations
            </Text>
          </CardContent>
        </Card>
      </View>
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
  content: {
    flex: 1,
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
  card: {
    flex: 1,
    // Card styling is handled by the Card component
  },
  cardHeader: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emojiContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    lineHeight: 60,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    // Color is handled by CardDescription component
  },
  features: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresLight: {
    color: '#666666',
  },
  featuresDark: {
    color: '#a1a1a1',
  },
});

export default MapScreen;
