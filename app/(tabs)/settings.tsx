import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useItems } from '../../src/context/ItemsContext';
import { ThemeMode } from '../../src/types';
import {
  Badge,
  Button,
  Card,
  Modal,
} from '../../src/components/ui';

export default function SettingsScreen() {
  const { colors, isDark, themeMode, setThemeMode } = useTheme();
  const { clearItems } = useItems();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const themeOptions: { mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { mode: 'system', label: 'System', icon: 'phone-portrait-outline' },
    { mode: 'light', label: 'Light', icon: 'sunny-outline' },
    { mode: 'dark', label: 'Dark', icon: 'moon-outline' },
  ];

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.warn('Could not open link:', err),
    );
  };

  const handleConfirmReset = () => {
    clearItems();
    setIsConfirmModalOpen(false);
    if (Platform.OS === 'web') {
      window.alert('Storage cleared successfully!');
    } else {
      Alert.alert('Cleared', 'Storage has been reset.');
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Theme Selection */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Appearance
      </Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
        Choose your preferred color theme or match device system settings.
      </Text>

      <View style={styles.themeRow}>
        {themeOptions.map((opt) => {
          const isSelected = themeMode === opt.mode;
          return (
            <Card
              key={opt.mode}
              variant={isSelected ? 'elevated' : 'outlined'}
              onPress={() => setThemeMode(opt.mode)}
              style={[
                styles.themeCard,
                isSelected && {
                  borderColor: colors.primary,
                  borderWidth: 2,
                  backgroundColor: isDark
                    ? 'rgba(99, 102, 241, 0.15)'
                    : colors.primaryLight,
                },
              ]}
            >
              <Ionicons
                name={opt.icon}
                size={22}
                color={isSelected ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.themeLabel,
                  { color: isSelected ? colors.primary : colors.text },
                ]}
              >
                {opt.label}
              </Text>
            </Card>
          );
        })}
      </View>

      {/* Storage Management */}
      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
        Storage & Cache
      </Text>

      <Card variant="outlined" style={styles.card}>
        <View style={styles.settingItem}>
          <View style={styles.settingText}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Clear Cached Items
            </Text>
            <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
              Deletes all local items from AsyncStorage.
            </Text>
          </View>
          <Button
            title="Reset"
            variant="danger"
            size="sm"
            onPress={() => setIsConfirmModalOpen(true)}
          />
        </View>
      </Card>

      {/* Environment / About Info */}
      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
        Environment & System
      </Text>

      <Card variant="outlined" style={styles.infoCard}>
        <InfoRow label="Framework" value="Expo SDK 58" />
        <InfoRow label="React Native" value="0.88.0" />
        <InfoRow label="React" value="19.3.1" />
        <InfoRow label="New Architecture" value="Enabled" isBadge />
        <InfoRow label="Platform" value={Platform.OS.toUpperCase()} />
        <InfoRow label="TypeScript" value="Strict" isBadge isLast />
      </Card>

      {/* External Resources */}
      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
        Documentation & Resources
      </Text>

      <Card variant="outlined" style={styles.linksCard}>
        <LinkItem
          title="React Native Documentation"
          url="https://reactnative.dev/docs/getting-started"
          icon="logo-react"
          onPress={handleOpenLink}
        />
        <LinkItem
          title="Expo Documentation"
          url="https://docs.expo.dev"
          icon="planet-outline"
          onPress={handleOpenLink}
        />
        <LinkItem
          title="Expo Router Guide"
          url="https://docs.expo.dev/router/introduction"
          icon="map-outline"
          onPress={handleOpenLink}
          isLast
        />
      </Card>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Reset Local Storage?"
        description="Are you sure you want to delete all cached items? This action cannot be undone."
        secondaryAction={{
          label: 'Cancel',
          onPress: () => setIsConfirmModalOpen(false),
        }}
        primaryAction={{
          label: 'Yes, Reset',
          variant: 'danger',
          onPress: handleConfirmReset,
        }}
      />
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  isBadge,
  isLast,
}: {
  label: string;
  value: string;
  isBadge?: boolean;
  isLast?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.infoRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
      ]}
    >
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      {isBadge ? (
        <Badge label={value} variant="success" size="sm" />
      ) : (
        <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
      )}
    </View>
  );
}

function LinkItem({
  title,
  url,
  icon,
  onPress,
  isLast,
}: {
  title: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: (url: string) => void;
  isLast?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => onPress(url)}
      style={[
        styles.linkItem,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
      ]}
    >
      <Ionicons name={icon} size={20} color={colors.primary} style={styles.linkIcon} />
      <Text style={[styles.linkTitle, { color: colors.text }]}>{title}</Text>
      <Ionicons name="open-outline" size={16} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  themeCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  themeLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    padding: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
  },
  infoCard: {
    padding: 0,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  linksCard: {
    padding: 0,
    marginBottom: 8,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  linkIcon: {
    marginRight: 12,
  },
  linkTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});
