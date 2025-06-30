import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { TabParamList } from '../types';
import MapScreen from '../screens/MapScreen';
import CompassScreen from '../screens/CompassScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useColorScheme } from '~/lib/useColorScheme';
import { colors } from '../styles/tokens';

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
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: isDarkColorScheme
          ? colors.neutral[500]
          : colors.neutral[400],
        tabBarStyle: {
          backgroundColor: isDarkColorScheme
            ? colors.background.dark
            : colors.surface.light,
          borderTopColor: isDarkColorScheme
            ? colors.border.dark
            : colors.border.light,
          borderTopWidth: 1,
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
