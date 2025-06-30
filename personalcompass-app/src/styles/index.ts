/**
 * Central export file for all styling modules
 *
 * This file provides a single import point for all design system components,
 * making it easier to maintain consistency across the application.
 */

// Design tokens - The foundation of our design system
export {
  colors,
  spacing,
  typography,
  borderRadius,
  componentSizes,
  shadows,
  opacity,
  tokens,
  getThemedColor,
  getColorWithOpacity,
} from './tokens';

// Shared styles and utilities
export {
  sharedStyles,
  getThemedStyles,
  getContainerStyle,
  getStatusCardStyle,
  getCoordinateContainerStyle,
  getDebugContainerStyle,
  getErrorContainerStyle,
  getOutlineButtonStyle,
  getTextColor,
  getPrimaryColor,
  getErrorColor,
  getSuccessColor,
} from './shared';

// Re-export default tokens for convenience
export { default as designTokens } from './tokens';
