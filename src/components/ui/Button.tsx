import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../hooks/useTheme';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  enableHaptics?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  enableHaptics = true,
}) => {
  const { colors, isDark } = useTheme();

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled || loading) return;
    if (enableHaptics && Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics unavailable on some devices, ignore
      }
    }
    onPress?.(e);
  };

  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: isDark ? colors.surfaceSubtle : colors.primaryLight,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.border,
        };
      case 'danger':
        return {
          backgroundColor: colors.danger,
          borderWidth: 0,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
        return isDark ? colors.text : colors.primary;
      case 'outline':
        return colors.text;
      case 'ghost':
        return colors.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 14,
        };
      case 'md':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: 12,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 13;
      case 'lg':
        return 17;
      case 'md':
      default:
        return 15;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        getContainerStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              styles.text,
              { color: getTextColor(), fontSize: getTextSize() },
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
