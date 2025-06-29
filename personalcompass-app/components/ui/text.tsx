import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface TextProps {
  style?: any;
  children?: React.ReactNode;
  ref?: React.RefObject<any>;
  [key: string]: any;
}

function Text({ style, ...props }: TextProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <RNText
      style={[
        styles.text,
        isDarkColorScheme ? styles.textDark : styles.textLight,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  textLight: {
    color: '#000000',
  },
  textDark: {
    color: '#ffffff',
  },
});

export { Text };
