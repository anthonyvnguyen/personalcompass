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
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e5',
    shadowColor: '#000000',
  },
  cardDark: {
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    shadowColor: '#ffffff',
  },
  cardHeader: {
    padding: 20,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
  },
  cardTitleLight: {
    color: '#1a1a1a',
  },
  cardTitleDark: {
    color: '#ffffff',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  cardDescriptionLight: {
    color: '#666666',
  },
  cardDescriptionDark: {
    color: '#a1a1a1',
  },
  cardContent: {
    padding: 20,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
