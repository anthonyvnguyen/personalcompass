import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  componentSizes,
  opacity,
} from './tokens';

// ============================================================================
// SHARED STYLES - DESIGN TOKEN BASED
// ============================================================================

export const sharedStyles = StyleSheet.create({
  // ============================================================================
  // LAYOUT & CONTAINERS
  // ============================================================================

  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: colors.background.light,
  },
  containerDark: {
    backgroundColor: colors.background.dark,
  },

  // Header styles
  header: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    paddingBottom: spacing[6],
  },

  // ScrollView and content
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing[6],
  },
  content: {
    paddingBottom: spacing[10],
  },

  // Section styles
  section: {
    marginTop: spacing[8],
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================

  // Headers
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[2],
    letterSpacing: typography.letterSpacing.tight,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    opacity: opacity.muted,
    fontWeight: typography.fontWeight.normal,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing[4],
    letterSpacing: typography.letterSpacing.normal,
  },

  // Text variants
  bodyText: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.normal,
  },
  smallText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.snug,
  },
  coordinateText: {
    fontFamily: 'monospace',
    fontSize: typography.fontSize.md,
    opacity: opacity.visible,
    lineHeight: typography.lineHeight.relaxed,
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: typography.lineHeight.loose,
    opacity: opacity.muted,
    fontSize: typography.fontSize.lg,
  },
  debugText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'monospace',
    opacity: opacity.muted,
    lineHeight: typography.lineHeight.snug,
  },

  // ============================================================================
  // BUTTONS
  // ============================================================================

  // Button text styles
  buttonText: {
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
  },
  primaryButtonText: {
    color: colors.neutral[0],
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
  },
  outlineButtonText: {
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
  },
  outlineButtonTextLight: {
    color: colors.text.primary.light,
  },
  outlineButtonTextDark: {
    color: colors.text.primary.dark,
  },

  // Button variants
  primaryButton: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius['2xl'],
    ...componentSizes.button.md,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: borderRadius['2xl'],
    ...componentSizes.button.md,
  },
  outlineButtonLight: {
    borderColor: colors.neutral[200],
  },
  outlineButtonDark: {
    borderColor: colors.neutral[700],
  },
  destructiveButton: {
    backgroundColor: colors.error[500],
    borderRadius: borderRadius['2xl'],
    ...componentSizes.button.md,
  },
  destructiveButtonText: {
    color: colors.neutral[0],
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
  },
  disabledButton: {
    opacity: opacity.disabled,
  },

  // ============================================================================
  // CARDS & CONTAINERS
  // ============================================================================

  // Card content styles
  cardContent: {
    padding: componentSizes.card.padding.lg,
  },
  cardContentCentered: {
    padding: componentSizes.card.padding.lg,
    alignItems: 'center',
  },
  cardContentCompact: {
    padding: componentSizes.card.padding.sm,
  },

  // Status card styles
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  statusIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing[3],
    width: spacing[6],
    textAlign: 'center',
  },
  statusText: {
    fontSize: typography.fontSize.md,
    opacity: opacity.subtle,
    flex: 1,
    lineHeight: typography.lineHeight.normal,
  },

  // Themed containers
  coordinateContainer: {
    padding: spacing[4],
    borderRadius: borderRadius['2xl'],
    marginBottom: spacing[5],
  },
  coordinateContainerLight: {
    backgroundColor: colors.neutral[50],
  },
  coordinateContainerDark: {
    backgroundColor: colors.neutral[900],
  },

  debugContainer: {
    marginTop: spacing[4],
    padding: spacing[4],
    borderRadius: borderRadius.xl,
  },
  debugContainerLight: {
    backgroundColor: colors.neutral[50],
  },
  debugContainerDark: {
    backgroundColor: colors.neutral[900],
  },

  errorContainer: {
    marginTop: spacing[4],
    padding: spacing[4],
    borderRadius: borderRadius.xl,
  },
  errorContainerLight: {
    backgroundColor: colors.error[50] || '#fef2f2',
  },
  errorContainerDark: {
    backgroundColor: colors.error[900] || '#7f1d1d',
  },

  statusCard: {
    padding: spacing[5],
  },
  statusCardLight: {
    backgroundColor: colors.neutral[50],
  },
  statusCardDark: {
    backgroundColor: colors.neutral[800],
  },

  // ============================================================================
  // LISTS & LAYOUT
  // ============================================================================

  listContainer: {
    gap: spacing[4],
    marginBottom: spacing[2],
  },
  listItem: {
    padding: 0,
  },

  // ============================================================================
  // FLEXBOX UTILITIES
  // ============================================================================

  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },

  // ============================================================================
  // SPACING UTILITIES
  // ============================================================================

  marginBottom16: {
    marginBottom: spacing[4],
  },
  paddingHorizontal16: {
    paddingHorizontal: spacing[4],
  },
});

// ============================================================================
// HELPER FUNCTIONS FOR THEMED STYLES
// ============================================================================

export const getThemedStyles = (
  isDark: boolean,
  lightStyle: any,
  darkStyle: any
) => {
  return isDark ? darkStyle : lightStyle;
};

export const getContainerStyle = (isDark: boolean) => [
  sharedStyles.container,
  isDark ? sharedStyles.containerDark : sharedStyles.containerLight,
];

export const getStatusCardStyle = (isDark: boolean) => [
  sharedStyles.statusCard,
  isDark ? sharedStyles.statusCardDark : sharedStyles.statusCardLight,
];

export const getCoordinateContainerStyle = (isDark: boolean) => [
  sharedStyles.coordinateContainer,
  isDark
    ? sharedStyles.coordinateContainerDark
    : sharedStyles.coordinateContainerLight,
];

export const getDebugContainerStyle = (isDark: boolean) => [
  sharedStyles.debugContainer,
  isDark ? sharedStyles.debugContainerDark : sharedStyles.debugContainerLight,
];

export const getErrorContainerStyle = (isDark: boolean) => [
  sharedStyles.errorContainer,
  isDark ? sharedStyles.errorContainerDark : sharedStyles.errorContainerLight,
];

export const getOutlineButtonStyle = (isDark: boolean) => [
  sharedStyles.outlineButton,
  isDark ? sharedStyles.outlineButtonDark : sharedStyles.outlineButtonLight,
];

export const getOutlineButtonTextStyle = (isDark: boolean) => [
  sharedStyles.outlineButtonText,
  isDark
    ? sharedStyles.outlineButtonTextDark
    : sharedStyles.outlineButtonTextLight,
];

// ============================================================================
// TEXT COLOR HELPERS
// ============================================================================

export const getTextColor = (
  variant: 'primary' | 'secondary' | 'tertiary',
  isDark: boolean
) => {
  return isDark ? colors.text[variant].dark : colors.text[variant].light;
};

export const getPrimaryColor = () => colors.primary[500];
export const getErrorColor = () => colors.error[500];
export const getSuccessColor = () => colors.success[500];
