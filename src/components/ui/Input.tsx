import React, { useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  clearable = true,
  onClear,
  value,
  onChangeText,
  containerStyle,
  style,
  onFocus,
  onBlur,
  placeholderTextColor,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    if (onChangeText) onChangeText('');
    if (onClear) onClear();
  };

  const getBorderColor = () => {
    if (error) return colors.danger;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.surface,
            borderColor: getBorderColor(),
          },
          isFocused && {
            borderWidth: 1.5,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor ?? colors.textMuted}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.input,
            { color: colors.text },
            style,
          ]}
          {...rest}
        />

        {clearable && !!value && (
          <Pressable
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={[styles.message, { color: colors.danger }]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text style={[styles.message, { color: colors.textMuted }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 46,
  },
  leftIconWrapper: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
