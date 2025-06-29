import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '../../lib/useColorScheme';

function CompassScreen() {
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
            Compass Screen
          </Text>
          <Text
            style={[
              styles.subtitle,
              isDarkColorScheme ? styles.subtitleDark : styles.subtitleLight,
            ]}
          >
            Dynamic compass with location indicators
          </Text>
        </View>

        <View style={styles.compassContainer}>
          <View
            style={[
              styles.compassPlaceholder,
              isDarkColorScheme
                ? styles.compassPlaceholderDark
                : styles.compassPlaceholderLight,
            ]}
          >
            <Text style={styles.compassIcon}>🧭</Text>
            <Text
              style={[
                styles.compassText,
                isDarkColorScheme
                  ? styles.compassTextDark
                  : styles.compassTextLight,
              ]}
            >
              Compass will be here
            </Text>
          </View>
          <View
            style={[
              styles.infoContainer,
              isDarkColorScheme
                ? styles.infoContainerDark
                : styles.infoContainerLight,
            ]}
          >
            <Text
              style={[
                styles.infoTitle,
                isDarkColorScheme
                  ? styles.infoTitleDark
                  : styles.infoTitleLight,
              ]}
            >
              Features:
            </Text>
            <Text
              style={[
                styles.infoText,
                isDarkColorScheme ? styles.infoTextDark : styles.infoTextLight,
              ]}
            >
              • Real-time compass heading{'\n'}• Direction indicators to saved
              locations{'\n'}• Distance information{'\n'}• Smooth animations
            </Text>
          </View>
        </View>
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
  compassContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
  compassTextLight: {
    color: '#333333',
  },
  compassTextDark: {
    color: '#ffffff',
  },
  infoContainer: {
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  infoContainerLight: {
    backgroundColor: '#ffffff',
  },
  infoContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoTitleLight: {
    color: '#333333',
  },
  infoTitleDark: {
    color: '#ffffff',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoTextLight: {
    color: '#666666',
  },
  infoTextDark: {
    color: '#a1a1a1',
  },
});

export default CompassScreen;
