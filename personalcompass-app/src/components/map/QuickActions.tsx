import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { useColorScheme } from '../../../lib/useColorScheme';
import { sharedStyles, getOutlineButtonTextStyle } from '../../styles/shared';
import { colors } from '../../styles/tokens';

interface QuickActionsProps {
  onAddCustomLocation: () => void;
  onViewCompass: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddCustomLocation,
  onViewCompass,
}) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Quick Actions</Text>
      <View style={[sharedStyles.row, styles.buttonRow]}>
        <Button
          onPress={onAddCustomLocation}
          variant='outline'
          style={[sharedStyles.flex1, styles.buttonSpacing]}
        >
          <Text style={getOutlineButtonTextStyle(isDarkColorScheme)}>
            Add Location
          </Text>
        </Button>
        <Button
          onPress={onViewCompass}
          style={[sharedStyles.primaryButton, sharedStyles.flex1]}
        >
          <Text style={sharedStyles.primaryButtonText}>View Compass</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    gap: 16,
  },
  buttonSpacing: {
    marginRight: 8,
  },
});
