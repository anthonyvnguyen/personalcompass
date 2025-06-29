import './global.css';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { NAV_THEME } from './lib/constants';
import { ColorSchemeProvider, useColorScheme } from './lib/useColorScheme';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

function AppContent() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <AppNavigator />
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ColorSchemeProvider>
      <AppContent />
    </ColorSchemeProvider>
  );
}
