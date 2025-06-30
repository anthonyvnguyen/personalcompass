/// <reference types="nativewind/types" />

declare module 'react-native' {
  import { ComponentType } from 'react';

  // Core React Native components
  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
    onLayout?: (event: any) => void;
    testID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityRole?: string;
    accessibilityState?: any;
    accessibilityHint?: string;
    onAccessibilityAction?: (event: any) => void;
    accessibilityValue?: any;
    onStartShouldSetResponder?: (event: any) => boolean;
    onMoveShouldSetResponder?: (event: any) => boolean;
    onResponderGrant?: (event: any) => void;
    onResponderReject?: (event: any) => void;
    onResponderMove?: (event: any) => void;
    onResponderRelease?: (event: any) => void;
    onResponderTerminationRequest?: (event: any) => boolean;
    onResponderTerminate?: (event: any) => void;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
    removeClippedSubviews?: boolean;
    collapsable?: boolean;
    needsOffscreenAlphaCompositing?: boolean;
    renderToHardwareTextureAndroid?: boolean;
    shouldRasterizeIOS?: boolean;
    isTVSelectable?: boolean;
    hasTVPreferredFocus?: boolean;
    tvParallaxProperties?: any;
    tvParallaxShiftDistanceX?: number;
    tvParallaxShiftDistanceY?: number;
    tvParallaxTiltAngle?: number;
    tvParallaxMagnification?: number;
    onTouchStart?: (event: any) => void;
    onTouchMove?: (event: any) => void;
    onTouchEnd?: (event: any) => void;
    onTouchCancel?: (event: any) => void;
    onTouchEndCapture?: (event: any) => void;
  }

  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    numberOfLines?: number;
    onPress?: () => void;
    onLongPress?: () => void;
    testID?: string;
    allowFontScaling?: boolean;
    maxFontSizeMultiplier?: number;
    minimumFontScale?: number;
    suppressHighlighting?: boolean;
    selectable?: boolean;
    selectionColor?: string;
    textBreakStrategy?: 'simple' | 'highQuality' | 'balanced';
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityRole?: string;
    accessibilityState?: any;
    accessibilityHint?: string;
    onAccessibilityAction?: (event: any) => void;
    accessibilityValue?: any;
    adjustsFontSizeToFit?: boolean;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    lineBreakMode?:
      | 'head'
      | 'middle'
      | 'tail'
      | 'clip'
      | 'wordWrapping'
      | 'charWrapping';
    nativeID?: string;
  }

  export interface ScrollViewProps extends ViewProps {
    horizontal?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
    onScroll?: (event: any) => void;
    scrollEventThrottle?: number;
    pagingEnabled?: boolean;
    bounces?: boolean;
    bouncesZoom?: boolean;
    alwaysBounceHorizontal?: boolean;
    alwaysBounceVertical?: boolean;
    contentContainerStyle?: any;
    decelerationRate?: 'fast' | 'normal' | number;
    directionalLockEnabled?: boolean;
    canCancelContentTouches?: boolean;
    keyboardDismissMode?: 'none' | 'interactive' | 'on-drag';
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
    maximumZoomScale?: number;
    minimumZoomScale?: number;
    pinchGestureEnabled?: boolean;
    scrollEnabled?: boolean;
    scrollsToTop?: boolean;
    snapToInterval?: number;
    snapToAlignment?: 'start' | 'center' | 'end';
    zoomScale?: number;
    contentInset?: any;
    contentOffset?: any;
    scrollIndicatorInsets?: any;
    snapToOffsets?: number[];
    snapToStart?: boolean;
    snapToEnd?: boolean;
    refreshControl?: React.ReactElement;
    endFillColor?: string;
    overScrollMode?: 'auto' | 'always' | 'never';
    scrollPerfTag?: string;
    DEPRECATED_sendUpdatedChildFrames?: boolean;
    onContentSizeChange?: (contentWidth: number, contentHeight: number) => void;
    onScrollBeginDrag?: (event: any) => void;
    onScrollEndDrag?: (event: any) => void;
    onMomentumScrollBegin?: (event: any) => void;
    onMomentumScrollEnd?: (event: any) => void;
    centerContent?: boolean;
    automaticallyAdjustContentInsets?: boolean;
    indicatorStyle?: 'default' | 'black' | 'white';
    scrollToOverflowEnabled?: boolean;
    StickyHeaderComponent?: ComponentType<any>;
    onScrollToTop?: (event: any) => void;
    maintainVisibleContentPosition?: any;
    invertStickyHeaders?: boolean;
    fadingEdgeLength?: number;
    nestedScrollEnabled?: boolean;
    persistentScrollbar?: boolean;
    disableIntervalMomentum?: boolean;
    disableScrollViewPanResponder?: boolean;
  }

  export interface PressableProps extends ViewProps {
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    onLongPress?: () => void;
    disabled?: boolean;
    hitSlop?: any;
    pressRetentionOffset?: any;
    android_disableSound?: boolean;
    android_ripple?: any;
    testOnly_pressed?: boolean;
    unstable_pressDelay?: number;
  }

  export interface StyleSheetStatic {
    create<T extends any>(styles: T): T;
    flatten(style: any): any;
    compose(style1: any, style2: any): any;
    hairlineWidth: number;
    absoluteFill: any;
    absoluteFillObject: any;
  }

  export interface DimensionsStatic {
    get(dim: 'window' | 'screen'): {
      width: number;
      height: number;
      scale: number;
      fontScale: number;
    };
    addEventListener(type: string, handler: any): any;
    removeEventListener(type: string, handler: any): void;
    set(dims: any): boolean;
  }

  export interface AlertStatic {
    alert(
      title: string,
      message?: string,
      buttons?: any[],
      options?: any
    ): void;
    prompt(
      title: string,
      message?: string,
      callbackOrButtons?: any,
      type?: string,
      defaultValue?: string,
      keyboardType?: string
    ): void;
  }

  export interface PlatformStatic {
    OS: 'ios' | 'android' | 'windows' | 'macos' | 'web';
    Version: string | number;
    isPad?: boolean;
    isTVOS?: boolean;
    isTV: boolean;
    isTesting: boolean;
    select<T>(specifics: { ios?: T; android?: T; native?: T; default?: T }): T;
  }

  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const ScrollView: ComponentType<ScrollViewProps>;
  export const Pressable: ComponentType<PressableProps>;
  export const StyleSheet: StyleSheetStatic;
  export const Dimensions: DimensionsStatic;
  export const Alert: AlertStatic;
  export const Platform: PlatformStatic;
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

declare module 'react-native-maps' {
  import * as React from 'react';

  export interface LatLng {
    latitude: number;
    longitude: number;
  }

  export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  export interface MapViewProps {
    style?: any;
    region?: Region;
    initialRegion?: Region;
    onRegionChange?: (region: Region) => void;
    onRegionChangeComplete?: (region: Region) => void;
    onPress?: (event: { coordinate: LatLng }) => void;
    onLongPress?: (event: { coordinate: LatLng }) => void;
    showsUserLocation?: boolean;
    followsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface MarkerProps {
    coordinate: LatLng;
    title?: string;
    description?: string;
    pinColor?: string;
    onPress?: () => void;
    onCalloutPress?: () => void;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface MapViewComponent extends React.Component<MapViewProps> {
    animateToRegion: (region: Region, duration?: number) => void;
    [key: string]: any;
  }

  export const MapView: React.ComponentType<MapViewProps> & {
    new (): MapViewComponent;
  };
  export const Marker: React.ComponentType<MarkerProps>;
  export const PROVIDER_GOOGLE: string;
  export const PROVIDER_DEFAULT: string;

  export default MapView;
}

// React Native Safe Area Context
declare module 'react-native-safe-area-context' {
  export interface SafeAreaViewProps {
    style?: any;
    children?: React.ReactNode;
    edges?: ('top' | 'right' | 'bottom' | 'left')[];
  }

  export const SafeAreaView: React.ComponentType<SafeAreaViewProps>;
  export const SafeAreaProvider: React.ComponentType<{
    children: React.ReactNode;
  }>;
}

// Custom UI Components
declare module '~/components/ui/card' {
  export interface CardProps {
    style?: any;
    children?: React.ReactNode;
  }

  export interface CardHeaderProps {
    style?: any;
    children?: React.ReactNode;
  }

  export interface CardContentProps {
    style?: any;
    children?: React.ReactNode;
  }

  export interface CardDescriptionProps {
    style?: any;
    children?: React.ReactNode;
  }

  export const Card: React.ComponentType<CardProps>;
  export const CardHeader: React.ComponentType<CardHeaderProps>;
  export const CardContent: React.ComponentType<CardContentProps>;
  export const CardDescription: React.ComponentType<CardDescriptionProps>;
}

declare module '~/components/ui/text' {
  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    variant?: string;
  }

  export const Text: React.ComponentType<TextProps>;
}

declare module '~/components/ui/button' {
  export interface ButtonProps {
    style?: any;
    children?: React.ReactNode;
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'ghost'
      | 'link'
      | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    onPress?: () => void;
    disabled?: boolean;
  }

  export const Button: React.ComponentType<ButtonProps>;
}

declare module '~/components/ui/separator' {
  export interface SeparatorProps {
    style?: any;
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
  }

  export const Separator: React.ComponentType<SeparatorProps>;
}

// Expo Maps
declare module 'expo-maps' {
  import { ViewProps } from 'react-native';

  export interface Coordinate {
    latitude: number;
    longitude: number;
  }

  export interface Region extends Coordinate {
    latitudeDelta: number;
    longitudeDelta: number;
  }

  export interface MapPressEvent {
    nativeEvent: {
      coordinate: Coordinate;
    };
  }

  export interface AppleMapsViewProps extends ViewProps {
    initialRegion?: Region;
    region?: Region;
    onPress?: (event: MapPressEvent) => void;
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    mapType?: 'standard' | 'satellite' | 'hybrid';
    colorScheme?: 'auto' | 'light' | 'dark';
    children?: React.ReactNode;
  }

  export interface GoogleMapsViewProps extends ViewProps {
    initialRegion?: Region;
    region?: Region;
    onPress?: (event: MapPressEvent) => void;
    showsUserLocation?: boolean;
    showsMyLocationButton?: boolean;
    mapType?: 'standard' | 'satellite' | 'hybrid' | 'terrain';
    colorScheme?: 'auto' | 'light' | 'dark';
    children?: React.ReactNode;
  }

  export interface MarkerProps {
    coordinate: Coordinate;
    title?: string;
    description?: string;
    onPress?: () => void;
  }

  export namespace AppleMaps {
    export const View: React.FC<AppleMapsViewProps>;
    export const Marker: React.FC<MarkerProps>;

    export enum MapType {
      Standard = 'standard',
      Satellite = 'satellite',
      Hybrid = 'hybrid',
    }

    export enum ColorScheme {
      Auto = 'auto',
      Light = 'light',
      Dark = 'dark',
    }
  }

  export namespace GoogleMaps {
    export const View: React.FC<GoogleMapsViewProps>;
    export const Marker: React.FC<MarkerProps>;

    export enum MapType {
      Standard = 'standard',
      Satellite = 'satellite',
      Hybrid = 'hybrid',
      Terrain = 'terrain',
    }

    export enum ColorScheme {
      Auto = 'auto',
      Light = 'light',
      Dark = 'dark',
    }
  }
}
