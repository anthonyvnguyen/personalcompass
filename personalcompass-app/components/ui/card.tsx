import React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  componentSizes,
} from '~/src/styles/tokens';

interface CardProps extends ViewProps {
  ref?: React.RefObject<any>;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

function Card({
  className,
  style,
  spacing: cardSpacing = 'none',
  ...props
}: CardProps) {
  const { isDarkColorScheme } = useColorScheme();

  const getSpacingStyle = () => {
    switch (cardSpacing) {
      case 'sm':
        return { marginBottom: spacing[3] };
      case 'md':
        return { marginBottom: spacing[4] };
      case 'lg':
        return { marginBottom: spacing[5] };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.card,
        isDarkColorScheme ? styles.cardDark : styles.cardLight,
        getSpacingStyle(),
        style,
      ]}
      {...props}
    />
  );
}

interface CardHeaderProps extends ViewProps {
  ref?: React.RefObject<any>;
}

function CardHeader({ className, style, ...props }: CardHeaderProps) {
  return <View style={[styles.cardHeader, style]} {...props} />;
}

interface CardTitleProps extends TextProps {
  ref?: React.RefObject<any>;
}

function CardTitle({ className, style, ...props }: CardTitleProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Text
      style={[
        styles.cardTitle,
        isDarkColorScheme ? styles.cardTitleDark : styles.cardTitleLight,
        style,
      ]}
      {...props}
    />
  );
}

interface CardDescriptionProps extends TextProps {
  ref?: React.RefObject<any>;
}

function CardDescription({ className, style, ...props }: CardDescriptionProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Text
      style={[
        styles.cardDescription,
        isDarkColorScheme
          ? styles.cardDescriptionDark
          : styles.cardDescriptionLight,
        style,
      ]}
      {...props}
    />
  );
}

interface CardContentProps extends ViewProps {
  ref?: React.RefObject<any>;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

function CardContent({
  className,
  style,
  size = 'lg',
  centered = false,
  ...props
}: CardContentProps) {
  const getPaddingStyle = () => {
    switch (size) {
      case 'sm':
        return { padding: componentSizes.card.padding.sm };
      case 'md':
        return { padding: componentSizes.card.padding.md };
      case 'lg':
      default:
        return { padding: componentSizes.card.padding.lg };
    }
  };

  return (
    <View
      style={[
        styles.cardContent,
        getPaddingStyle(),
        centered && styles.cardContentCentered,
        style,
      ]}
      {...props}
    />
  );
}

interface CardFooterProps extends ViewProps {
  ref?: React.RefObject<any>;
}

function CardFooter({ className, style, ...props }: CardFooterProps) {
  return <View style={[styles.cardFooter, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['3xl'],
    borderWidth: 1,
    // No default marginBottom - spacing controlled by parent or spacing prop
  },
  cardLight: {
    backgroundColor: colors.surface.light,
    borderColor: colors.border.light,
  },
  cardDark: {
    backgroundColor: colors.surface.dark,
    borderColor: colors.border.dark,
  },
  cardHeader: {
    padding: componentSizes.card.padding.lg,
    paddingBottom: spacing[4],
  },
  cardTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.loose,
    marginBottom: spacing[1],
    letterSpacing: typography.letterSpacing.normal,
  },
  cardTitleLight: {
    color: colors.text.primary.light,
  },
  cardTitleDark: {
    color: colors.text.primary.dark,
  },
  cardDescription: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.normal,
  },
  cardDescriptionLight: {
    color: colors.text.secondary.light,
  },
  cardDescriptionDark: {
    color: colors.text.secondary.dark,
  },
  cardContent: {
    // Base content styles - padding controlled by size prop
  },
  cardContentCentered: {
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: componentSizes.card.padding.lg,
    paddingTop: 0,
  },
});

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
