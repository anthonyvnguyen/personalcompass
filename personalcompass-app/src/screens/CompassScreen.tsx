import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/text';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { useColorScheme } from '../../lib/useColorScheme';
import { sharedStyles, getContainerStyle } from '../styles/shared';
import { StatusCard, FeatureList } from '../components/common';

function CompassScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView
      style={getContainerStyle(isDarkColorScheme)}
      edges={['top', 'left', 'right']}
    >
      {/* Header */}
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.title}>🧭 Compass</Text>
        <Text style={sharedStyles.subtitle}>
          Dynamic compass with location indicators
        </Text>
      </View>

      <ScrollView
        style={sharedStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={sharedStyles.content}>
          {/* Compass Display */}
          <Card style={sharedStyles.cardSpacing}>
            <CardContent style={sharedStyles.cardContentCentered}>
              <View
                style={[
                  styles.compassPlaceholder,
                  isDarkColorScheme
                    ? styles.compassPlaceholderDark
                    : styles.compassPlaceholderLight,
                ]}
              >
                <Text style={styles.compassIcon}>🧭</Text>
                <Text style={styles.compassText}>Compass will be here</Text>
              </View>
            </CardContent>
          </Card>

          {/* Features Info */}
          <Card style={sharedStyles.section}>
            <CardHeader>
              <CardTitle>✨ Features</CardTitle>
            </CardHeader>
            <CardContent>
              <FeatureList
                features={[
                  { icon: '📍', text: 'Real-time compass heading' },
                  {
                    icon: '🎯',
                    text: 'Direction indicators to saved locations',
                  },
                  { icon: '📏', text: 'Distance information' },
                  { icon: '✨', text: 'Smooth animations' },
                ]}
              />
            </CardContent>
          </Card>

          {/* Status Info */}
          <StatusCard
            items={[
              { icon: '⚠️', text: 'Compass implementation coming soon' },
              {
                icon: '🗺️',
                text: 'Add locations from the Map screen to see them here',
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  compassPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  compassPlaceholderLight: {
    backgroundColor: '#ffffff',
    borderColor: '#007AFF',
  },
  compassPlaceholderDark: {
    backgroundColor: '#1a1a1a',
    borderColor: '#007AFF',
  },
  compassIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  compassText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CompassScreen;
