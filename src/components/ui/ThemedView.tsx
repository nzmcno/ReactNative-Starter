import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface ThemedViewProps extends ViewProps {
  variant?: 'background' | 'surface' | 'subtle' | 'card';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'background',
  style,
  children,
  ...rest
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return colors.surface;
      case 'subtle':
        return colors.surfaceSubtle;
      case 'card':
        return colors.card;
      case 'background':
      default:
        return colors.background;
    }
  };

  return (
    <View
      style={[{ backgroundColor: getBackgroundColor() }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};
