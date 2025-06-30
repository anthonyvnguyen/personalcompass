import React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface CardProps extends ViewProps {
  ref?: React.RefObject<any>;
}

function Card({ className, style, ...props }: CardProps) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      style={[
        styles.card,
        isDarkColorScheme ? styles.cardDark : styles.cardLight,
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
}

function CardContent({ className, style, ...props }: CardContentProps) {
  return <View style={[styles.cardContent, style]} {...props} />;
}

interface CardFooterProps extends ViewProps {
  ref?: React.RefObject<any>;
}

function CardFooter({ className, style, ...props }: CardFooterProps) {
  return <View style={[styles.cardFooter, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#f0f0f0',
  },
  cardDark: {
    backgroundColor: '#0f0f0f',
    borderColor: '#1a1a1a',
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  cardTitleLight: {
    color: '#000000',
  },
  cardTitleDark: {
    color: '#ffffff',
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 20,
  },
  cardDescriptionLight: {
    color: '#666666',
  },
  cardDescriptionDark: {
    color: '#a1a1a1',
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
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
