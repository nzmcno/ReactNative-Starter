import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'label' | 'code';
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  color,
  weight,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const { colors } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: 28,
          lineHeight: 34,
          fontWeight: '700' as const,
          color: colors.text,
        };
      case 'h2':
        return {
          fontSize: 22,
          lineHeight: 28,
          fontWeight: '700' as const,
          color: colors.text,
        };
      case 'h3':
        return {
          fontSize: 18,
          lineHeight: 24,
          fontWeight: '600' as const,
          color: colors.text,
        };
      case 'subtitle':
        return {
          fontSize: 15,
          lineHeight: 20,
          fontWeight: '500' as const,
          color: colors.textSecondary,
        };
      case 'body':
        return {
          fontSize: 15,
          lineHeight: 22,
          fontWeight: '400' as const,
          color: colors.text,
        };
      case 'caption':
        return {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: '400' as const,
          color: colors.textMuted,
        };
      case 'label':
        return {
          fontSize: 13,
          lineHeight: 18,
          fontWeight: '600' as const,
          color: colors.textSecondary,
          letterSpacing: 0.2,
        };
      case 'code':
        return {
          fontSize: 13,
          lineHeight: 18,
          fontWeight: '500' as const,
          fontFamily: 'monospace',
          color: colors.primary,
        };
      default:
        return {
          fontSize: 15,
          lineHeight: 22,
          color: colors.text,
        };
    }
  };

  const getWeightStyle = () => {
    if (!weight) return null;
    switch (weight) {
      case 'regular':
        return { fontWeight: '400' as const };
      case 'medium':
        return { fontWeight: '500' as const };
      case 'semibold':
        return { fontWeight: '600' as const };
      case 'bold':
        return { fontWeight: '700' as const };
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        getWeightStyle(),
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
