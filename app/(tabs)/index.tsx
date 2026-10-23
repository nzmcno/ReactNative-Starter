import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useItems } from '../../src/context/ItemsContext';
import { Badge, Button, Card } from '../../src/components/ui';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark, themeMode } = useTheme();
  const { items } = useItems();

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Banner */}
      <Card variant="elevated" style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Badge label="v1.0.0" variant="primary" />
          <Badge
            label={Platform.OS.toUpperCase()}
            variant="neutral"
          />
        </View>

        <Text style={[styles.heroTitle, { color: colors.text }]}>
          React Native Starter Kit
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          A modern, battle-tested foundation for React Native apps built with Expo SDK 58, Expo Router, TypeScript, and the New Architecture.
        </Text>

        <View style={styles.heroActions}>
          <Button
            title="Explore Showcase"
            variant="primary"
            icon={<Ionicons name="sparkles" size={16} color="#FFFFFF" />}
            onPress={() => router.push('/components')}
            style={styles.heroBtn}
          />
          <Button
            title="Open Modal"
            variant="outline"
            onPress={() => router.push('/modal')}
            style={styles.heroBtn}
          />
        </View>
      </Card>

      {/* Quick Metrics */}
      <View style={styles.statsRow}>
        <Card variant="outlined" style={styles.statCard}>
          <Ionicons name="layers-outline" size={20} color={colors.primary} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {items.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Total Items
          </Text>
        </Card>

        <Card variant="outlined" style={styles.statCard}>
          <Ionicons name="checkmark-done-circle-outline" size={20} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {completedCount}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Completed
          </Text>
        </Card>

        <Card variant="outlined" style={styles.statCard}>
          <Ionicons
            name={isDark ? 'moon-outline' : 'sunny-outline'}
            size={20}
            color={colors.warning}
          />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {themeMode.toUpperCase()}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Theme
          </Text>
        </Card>
      </View>

      {/* Architecture Features */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Key Architecture Features
      </Text>

      <Card variant="outlined" style={styles.featureCard}>
        <FeatureItem
          icon="hardware-chip-outline"
          title="React 19 & New Architecture"
          desc="Synchronous layout, TurboModules, and enhanced native bridging."
        />
        <FeatureItem
          icon="git-branch-outline"
          title="Type-Safe Expo Router"
          desc="File-based routes, native tabs, modals, and deep links out of the box."
        />
        <FeatureItem
          icon="color-palette-outline"
          title="Adaptive Theming System"
          desc="Instant switching between Light, Dark, and System modes with AsyncStorage caching."
        />
        <FeatureItem
          icon="phone-portrait-outline"
          title="Universal Cross-Platform"
          desc="Runs simultaneously on iOS, Android, and Web with responsive layouts."
          isLast
        />
      </Card>

      {/* Tribute Demo: Car Image (from original 2019 starter) */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Starter Assets Demo
      </Text>

      <Card variant="outlined" style={styles.carCard}>
        <Image
          source={require('../../assets/images/car.jpeg')}
          style={styles.carImage}
          resizeMode="cover"
        />
        <View style={styles.carInfo}>
          <Text style={[styles.carTitle, { color: colors.text }]}>
            Preserved Starter Asset Demo
          </Text>
          <Text style={[styles.carSubtitle, { color: colors.textSecondary }]}>
            Upgraded from the original 2019 test project into this modern production-ready template.
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  isLast?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.featureItem,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
      ]}
    >
      <View style={[styles.featureIcon, { backgroundColor: colors.surfaceSubtle }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.featureText}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
          {desc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    padding: 20,
    marginBottom: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  heroBtn: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 4,
  },
  featureCard: {
    padding: 0,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  carCard: {
    padding: 0,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  carInfo: {
    padding: 14,
  },
  carTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  carSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});
