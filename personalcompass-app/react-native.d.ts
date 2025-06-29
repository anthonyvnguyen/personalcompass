declare module 'react-native' {
  import * as React from 'react';

  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface ScrollViewProps {
    style?: any;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface PressableProps {
    style?: any;
    children?: React.ReactNode;
    onPress?: () => void;
    [key: string]: any;
  }

  export interface ViewComponent extends React.Component<ViewProps> {}
  export interface TextComponent extends React.Component<TextProps> {}

  export const View: React.ComponentType<ViewProps> & {
    new (): ViewComponent;
  };
  export const Text: React.ComponentType<TextProps> & {
    new (): TextComponent;
  };
  export const ScrollView: React.ComponentType<ScrollViewProps>;
  export const Pressable: React.ComponentType<PressableProps>;
  export const StyleSheet: {
    create: (styles: any) => any;
    [key: string]: any;
  };
  export const useColorScheme: () => 'light' | 'dark' | null | undefined;
}

declare module '@react-navigation/core' {
  export interface NavigatorScreenParams {
    id?: string;
  }
}

declare module '@react-navigation/native' {
  import * as React from 'react';

  export interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      [key: string]: string;
    };
  }

  export const DefaultTheme: Theme;
  export const DarkTheme: Theme;
  export const ThemeProvider: React.ComponentType<{
    value: Theme;
    children: React.ReactNode;
  }>;
  export const NavigationContainer: React.ComponentType<{
    theme?: Theme;
    children: React.ReactNode;
    [key: string]: any;
  }>;
  export { Theme };
}
