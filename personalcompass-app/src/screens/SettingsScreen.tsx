import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>App preferences and configuration</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 Appearance</Text>
            <Text style={styles.sectionDescription}>
              Theme, colors, and display options
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧭 Compass</Text>
            <Text style={styles.sectionDescription}>
              Calibration, units, and accuracy settings
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Location</Text>
            <Text style={styles.sectionDescription}>
              Permissions and location services
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💾 Data</Text>
            <Text style={styles.sectionDescription}>
              Manage saved locations and app data
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ℹ️ About</Text>
            <Text style={styles.sectionDescription}>
              App version, help, and support
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SettingsScreen;
