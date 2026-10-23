import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'large',
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={[styles.text, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
  },
});
