import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#0a0a0a',
  },

  // Header styles
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    fontWeight: '400',
  },

  // ScrollView and content
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 40,
  },

  // Section styles
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // Button styles
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#a855f7', // Light purple
    borderRadius: 12,
    minHeight: 52,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    minHeight: 52,
  },
  outlineButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  destructiveButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    minHeight: 52,
  },
  destructiveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },

  // Card styles
  cardSpacing: {
    marginBottom: 20,
  },
  cardContentCentered: {
    padding: 24,
    alignItems: 'center',
  },

  // Status card styles
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 15,
    opacity: 0.7,
    flex: 1,
    lineHeight: 20,
  },

  // List styles
  listContainer: {
    gap: 16,
    marginBottom: 8,
  },
  listItem: {
    padding: 0,
  },

  // Text styles
  coordinateText: {
    fontFamily: 'monospace',
    fontSize: 15,
    opacity: 0.8,
    lineHeight: 22,
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.6,
    fontSize: 16,
  },
  debugText: {
    fontSize: 13,
    fontFamily: 'monospace',
    opacity: 0.6,
    lineHeight: 18,
  },

  // Spacing utilities
  marginBottom16: {
    marginBottom: 16,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },

  // Flexbox utilities
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

  // Color-specific containers
  coordinateContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  coordinateContainerLight: {
    backgroundColor: '#f8f9fa',
  },
  coordinateContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  debugContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
  },
  debugContainerLight: {
    backgroundColor: '#f8f9fa',
  },
  debugContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  errorContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
  },
  errorContainerLight: {
    backgroundColor: '#fef2f2',
  },
  errorContainerDark: {
    backgroundColor: '#7f1d1d',
  },
  statusCard: {
    padding: 20,
  },
  statusCardLight: {
    backgroundColor: '#fafafa',
  },
  statusCardDark: {
    backgroundColor: '#111111',
  },
});

// Helper functions for themed styles
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
