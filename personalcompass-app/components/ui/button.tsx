import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

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
        baseStyle.push(
          isDarkColorScheme
            ? styles.buttonPrimaryDark
            : styles.buttonPrimaryLight
        );
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
    borderRadius: 8,
  },
  buttonDefault: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonSm: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonLg: {
    height: 56,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonIcon: {
    height: 40,
    width: 40,
    paddingHorizontal: 0,
  },
  buttonPrimaryLight: {
    backgroundColor: '#3b82f6',
  },
  buttonPrimaryDark: {
    backgroundColor: '#2563eb',
  },
  buttonOutlineLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonOutlineDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
  },
  buttonSecondaryLight: {
    backgroundColor: '#f3f4f6',
  },
  buttonSecondaryDark: {
    backgroundColor: '#374151',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export { Button };
export type { ButtonProps };
