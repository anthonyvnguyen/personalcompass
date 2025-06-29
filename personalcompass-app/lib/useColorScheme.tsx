import React from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ColorScheme = 'light' | 'dark' | 'system';

const ColorSchemeContext = React.createContext<{
  colorScheme: ColorScheme;
  isDarkColorScheme: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
} | null>(null);

export function ColorSchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorSchemeState] =
    React.useState<ColorScheme>('system');
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load saved color scheme on mount
  React.useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const saved = await AsyncStorage.getItem('colorScheme');
        if (
          saved &&
          (saved === 'light' || saved === 'dark' || saved === 'system')
        ) {
          setColorSchemeState(saved as ColorScheme);
        }
      } catch (error) {
        console.log('Error loading color scheme:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadColorScheme();
  }, []);

  // Save color scheme when it changes
  const setColorScheme = React.useCallback(async (scheme: ColorScheme) => {
    try {
      await AsyncStorage.setItem('colorScheme', scheme);
      setColorSchemeState(scheme);
    } catch (error) {
      console.log('Error saving color scheme:', error);
    }
  }, []);

  const toggleColorScheme = React.useCallback(() => {
    const currentEffective =
      colorScheme === 'system' ? systemColorScheme : colorScheme;
    const newScheme = currentEffective === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  }, [colorScheme, systemColorScheme, setColorScheme]);

  const isDarkColorScheme = React.useMemo(() => {
    if (colorScheme === 'system') {
      return systemColorScheme === 'dark';
    }
    return colorScheme === 'dark';
  }, [colorScheme, systemColorScheme]);

  const value = React.useMemo(
    () => ({
      colorScheme,
      isDarkColorScheme,
      setColorScheme,
      toggleColorScheme,
    }),
    [colorScheme, isDarkColorScheme, setColorScheme, toggleColorScheme]
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = React.useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
}
