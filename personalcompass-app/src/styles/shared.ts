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
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },

  // ScrollView and content
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 32,
  },

  // Section styles
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  // Button styles
  buttonText: {
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  outlineButtonText: {
    fontWeight: '500',
  },
  destructiveButton: {
    backgroundColor: '#dc2626',
  },
  destructiveButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },

  // Card styles
  cardSpacing: {
    marginBottom: 16,
  },
  cardContentCentered: {
    padding: 16,
    alignItems: 'center',
  },

  // Status card styles
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    opacity: 0.7,
    flex: 1,
  },

  // List styles
  listContainer: {
    gap: 12,
  },
  listItem: {
    padding: 16,
  },

  // Text styles
  coordinateText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.7,
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'monospace',
    opacity: 0.7,
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
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  coordinateContainerLight: {
    backgroundColor: '#f3f4f6',
  },
  coordinateContainerDark: {
    backgroundColor: '#374151',
  },
  debugContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 6,
  },
  debugContainerLight: {
    backgroundColor: '#f3f4f6',
  },
  debugContainerDark: {
    backgroundColor: '#374151',
  },
  errorContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 6,
  },
  errorContainerLight: {
    backgroundColor: '#fef2f2',
  },
  errorContainerDark: {
    backgroundColor: '#7f1d1d',
  },
  statusCard: {
    padding: 16,
  },
  statusCardLight: {
    backgroundColor: '#f9fafb',
  },
  statusCardDark: {
    backgroundColor: '#1f2937',
  },
});

// Helper function to combine styles based on theme
export const getThemedStyles = (
  isDark: boolean,
  lightStyle: any,
  darkStyle: any
) => {
  return isDark ? darkStyle : lightStyle;
};

// Common style combinations
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
