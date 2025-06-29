import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CompassScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Compass Screen</Text>
        <Text style={styles.subtitle}>
          Dynamic compass with location indicators
        </Text>
        <View style={styles.compassContainer}>
          <View style={styles.compassPlaceholder}>
            <Text style={styles.compassIcon}>🧭</Text>
            <Text style={styles.compassText}>Compass will be here</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Features:</Text>
            <Text style={styles.infoText}>
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
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
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
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  compassIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  compassText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CompassScreen;
