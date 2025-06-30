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
    borderRadius: 12,
  },
  buttonDefault: {
    height: 52,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonSm: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonLg: {
    height: 60,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  buttonIcon: {
    height: 44,
    width: 44,
    paddingHorizontal: 0,
  },
  buttonPrimary: {
    backgroundColor: '#a855f7', // Light purple
  },
  buttonOutlineLight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  buttonOutlineDark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonSecondaryLight: {
    backgroundColor: '#f8f9fa',
  },
  buttonSecondaryDark: {
    backgroundColor: '#1a1a1a',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});

export { Button };
export type { ButtonProps };
