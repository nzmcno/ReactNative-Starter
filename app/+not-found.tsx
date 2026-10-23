import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/ui';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Ionicons name="alert-circle-outline" size={64} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Screen Not Found
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          This screen doesn't exist or may have been moved.
        </Text>

        <Link href="/" asChild>
          <Button title="Return to Home" variant="primary" style={styles.button} />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    minWidth: 160,
  },
});
