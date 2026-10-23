import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
}) => {
  const { colors, isDark } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: isDark ? 'rgba(52, 211, 153, 0.15)' : colors.successLight,
          text: colors.success,
        };
      case 'warning':
        return {
          bg: isDark ? 'rgba(251, 191, 36, 0.15)' : colors.warningLight,
          text: colors.warning,
        };
      case 'danger':
        return {
          bg: isDark ? 'rgba(248, 113, 113, 0.15)' : colors.dangerLight,
          text: colors.danger,
        };
      case 'neutral':
        return {
          bg: colors.surfaceSubtle,
          text: colors.textSecondary,
        };
      case 'primary':
      default:
        return {
          bg: isDark ? 'rgba(99, 102, 241, 0.18)' : colors.primaryLight,
          text: colors.primary,
        };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        size === 'sm' ? styles.badgeSm : styles.badgeMd,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: text },
          size === 'sm' ? styles.textSm : styles.textMd,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '600',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 12,
  },
});
