import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { sharedStyles, getOutlineButtonTextStyle } from '../src/styles/shared';
import { colors, spacing, typography } from '../src/styles/tokens';

export function ThemeToggle() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={sharedStyles.rowSpaceBetween}>
      <Text
        style={[
          styles.label,
          {
            color: isDarkColorScheme
              ? colors.text.primary.dark
              : colors.text.primary.light,
          },
        ]}
      >
        Theme: {isDarkColorScheme ? 'Dark' : 'Light'}
      </Text>
      <Button
        variant='outline'
        size='sm'
        onPress={toggleColorScheme}
        style={styles.button}
      >
        <Text style={getOutlineButtonTextStyle(isDarkColorScheme)}>
          {isDarkColorScheme ? '☀️ Light' : '🌙 Dark'}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.normal,
  },
  button: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minWidth: spacing[20],
  },
});
