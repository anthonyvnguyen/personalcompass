import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';

export function ThemeToggle() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Theme: {isDarkColorScheme ? 'Dark' : 'Light'}
      </Text>
      <Button
        variant='outline'
        size='sm'
        onPress={toggleColorScheme}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isDarkColorScheme ? '☀️ Light' : '🌙 Dark'}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});
