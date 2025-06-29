import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { TabParamList } from '../types';
import MapScreen from '../screens/MapScreen';
import CompassScreen from '../screens/CompassScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useColorScheme } from '~/lib/useColorScheme';

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'MapTab') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'CompassTab') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDarkColorScheme ? '#8E8E93' : '#8E8E93',
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? '#1C1C1E' : '#F2F2F7',
          borderTopColor: isDarkColorScheme ? '#38383A' : '#C6C6C8',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='MapTab'
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
        }}
      />
      <Tab.Screen
        name='CompassTab'
        component={CompassScreen}
        options={{
          tabBarLabel: 'Compass',
        }}
      />
      <Tab.Screen
        name='SettingsTab'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
