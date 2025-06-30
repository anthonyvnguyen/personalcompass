import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components/ui/text';
import { sharedStyles } from '../../styles/shared';

interface Feature {
  icon: string;
  text: string;
}

interface FeatureListProps {
  features: Feature[];
  textStyle?: any;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  textStyle,
}) => {
  return (
    <View style={sharedStyles.listContainer}>
      {features.map((feature, index) => (
        <View key={index} style={sharedStyles.rowCenter}>
          <Text style={sharedStyles.statusIcon}>{feature.icon}</Text>
          <Text style={[{ fontSize: 16, flex: 1 }, textStyle]}>
            {feature.text}
          </Text>
        </View>
      ))}
    </View>
  );
};
