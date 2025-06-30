/**
 * Design Tokens - Single Source of Truth for Design System
 *
 * All colors, spacing, typography, and other design values should be defined here
 * and imported throughout the application to ensure consistency.
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary brand colors
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Main brand color (light purple)
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },

  // Neutral colors (grays, blacks, whites)
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic colors
  success: {
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },

  // Theme-specific colors
  background: {
    light: '#f5f5f5',
    dark: '#0a0a0a',
  },
  surface: {
    light: '#ffffff',
    dark: '#0f0f0f',
  },
  border: {
    light: '#f0f0f0',
    dark: '#1a1a1a',
  },
  text: {
    primary: {
      light: '#000000',
      dark: '#ffffff',
    },
    secondary: {
      light: '#666666',
      dark: '#a1a1a1',
    },
    tertiary: {
      light: '#888888',
      dark: '#737373',
    },
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 15,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 16,
    snug: 18,
    normal: 20,
    relaxed: 22,
    loose: 24,
  },
  letterSpacing: {
    tight: -0.5,
    normal: -0.3,
    wide: -0.2,
    wider: 0.5,
  },
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 12,
  '3xl': 16,
  full: 9999,
} as const;

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const componentSizes = {
  button: {
    sm: { height: 40, paddingHorizontal: 16, paddingVertical: 10 },
    md: { height: 52, paddingHorizontal: 24, paddingVertical: 16 },
    lg: { height: 60, paddingHorizontal: 32, paddingVertical: 20 },
    icon: { height: 44, width: 44, paddingHorizontal: 0 },
  },
  input: {
    sm: { height: 40, paddingHorizontal: 12, paddingVertical: 8 },
    md: { height: 48, paddingHorizontal: 16, paddingVertical: 12 },
    lg: { height: 56, paddingHorizontal: 20, paddingVertical: 16 },
  },
  card: {
    padding: {
      sm: 16,
      md: 20,
      lg: 24,
    },
  },
} as const;

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

export const shadows = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

// ============================================================================
// OPACITY
// ============================================================================

export const opacity = {
  disabled: 0.4,
  muted: 0.6,
  subtle: 0.7,
  visible: 0.8,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get themed color based on light/dark mode
 */
export const getThemedColor = (colorPath: string, isDark: boolean): string => {
  const pathParts = colorPath.split('.');

  // Handle theme-specific colors (background, surface, border, text)
  if (
    (pathParts.length === 2 && pathParts[1] === 'light') ||
    pathParts[1] === 'dark'
  ) {
    const [category] = pathParts;
    return (colors as any)[category][isDark ? 'dark' : 'light'];
  }

  // Handle nested color objects
  let color = colors as any;
  for (const part of pathParts) {
    color = color[part];
  }

  return color;
};

/**
 * Get color with opacity
 */
export const getColorWithOpacity = (
  color: string,
  opacityValue: number
): string => {
  // Convert hex to rgba if needed
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
  }

  return color;
};

// ============================================================================
// EXPORTS
// ============================================================================

export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  componentSizes,
  shadows,
  opacity,
} as const;

export default tokens;
