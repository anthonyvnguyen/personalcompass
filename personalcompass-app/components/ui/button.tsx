import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import {
  colors,
  borderRadius,
  componentSizes,
  opacity,
} from '~/src/styles/tokens';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

function Button({
  variant = 'default',
  size = 'default',
  style,
  disabled,
  ...props
}: ButtonProps) {
  const { isDarkColorScheme } = useColorScheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Add size styles
    switch (size) {
      case 'sm':
        baseStyle.push(styles.buttonSm);
        break;
      case 'lg':
        baseStyle.push(styles.buttonLg);
        break;
      case 'icon':
        baseStyle.push(styles.buttonIcon);
        break;
      default:
        baseStyle.push(styles.buttonDefault);
    }

    // Add variant styles
    switch (variant) {
      case 'outline':
        baseStyle.push(
          isDarkColorScheme
            ? styles.buttonOutlineDark
            : styles.buttonOutlineLight
        );
        break;
      case 'secondary':
        baseStyle.push(
          isDarkColorScheme
            ? styles.buttonSecondaryDark
            : styles.buttonSecondaryLight
        );
        break;
      case 'ghost':
        baseStyle.push(styles.buttonGhost);
        break;
      case 'destructive':
        baseStyle.push(styles.buttonDestructive);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }

    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }

    return baseStyle;
  };

  return (
    <Pressable
      style={[...getButtonStyle(), style]}
      disabled={disabled}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius['2xl'],
  },
  buttonDefault: {
    ...componentSizes.button.md,
  },
  buttonSm: {
    ...componentSizes.button.sm,
  },
  buttonLg: {
    ...componentSizes.button.lg,
  },
  buttonIcon: {
    ...componentSizes.button.icon,
  },
  buttonPrimary: {
    backgroundColor: colors.primary[500],
  },
  buttonOutlineLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  buttonOutlineDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neutral[700],
  },
  buttonSecondaryLight: {
    backgroundColor: colors.neutral[50],
  },
  buttonSecondaryDark: {
    backgroundColor: colors.neutral[900],
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: colors.error[500],
  },
  buttonDisabled: {
    opacity: opacity.disabled,
  },
});

export { Button };
export type { ButtonProps };
