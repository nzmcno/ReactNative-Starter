import React from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Button } from './Button';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'danger';
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Pressable
          style={[
            styles.backdrop,
            { backgroundColor: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(15, 23, 42, 0.45)' },
          ]}
          onPress={onClose}
        />

        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={[styles.closeBtn, { backgroundColor: colors.surfaceSubtle }]}
            >
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </Pressable>
          </View>

          {description && (
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {description}
            </Text>
          )}

          {/* Body */}
          {children && <View style={styles.body}>{children}</View>}

          {/* Footer Actions */}
          {(primaryAction || secondaryAction) && (
            <View style={styles.footer}>
              {secondaryAction && (
                <Button
                  title={secondaryAction.label}
                  variant="outline"
                  onPress={secondaryAction.onPress}
                  style={styles.actionBtn}
                />
              )}
              {primaryAction && (
                <Button
                  title={primaryAction.label}
                  variant={primaryAction.variant ?? 'primary'}
                  loading={primaryAction.loading}
                  onPress={primaryAction.onPress}
                  style={styles.actionBtn}
                />
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  container: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  body: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
  },
});
