import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { colors, typography } from '~/src/styles/tokens';

interface TextProps {
  style?: any;
  children?: React.ReactNode;
  ref?: React.RefObject<any>;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  [key: string]: any;
}

function Text({
  style,
  variant = 'primary',
  size = 'lg',
  weight = 'normal',
  ...props
}: TextProps) {
  const { isDarkColorScheme } = useColorScheme();

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    // Add size style
    baseStyle.push({ fontSize: typography.fontSize[size] });

    // Add weight style
    baseStyle.push({ fontWeight: typography.fontWeight[weight] });

    // Add color variant
    const colorKey = isDarkColorScheme ? 'dark' : 'light';
    baseStyle.push({ color: colors.text[variant][colorKey] });

    return baseStyle;
  };

  return <RNText style={[...getTextStyle(), style]} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    // Base text styles
  },
});

export { Text };
