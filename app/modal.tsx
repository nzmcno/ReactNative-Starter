import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/hooks/useTheme';
import { Badge, Button, Card, Input } from '../src/components/ui';

export default function ModalScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      router.back();
    }, 1200);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card variant="outlined" style={styles.card}>
        <View style={styles.badgeRow}>
          <Badge label="Expo Router Presentation" variant="primary" />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          Native Sheet Modal
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          This screen is rendered using Expo Router's native modal presentation mode. On iOS it slides up as a native card sheet, and on Android it slides up smoothly.
        </Text>

        <View style={styles.divider} />

        <Input
          label="Test Modal Form Input"
          placeholder="Type something to test keyboard behavior..."
          value={feedback}
          onChangeText={setFeedback}
          helperText="KeyboardAvoidingView automatically handles offsets"
        />

        {submitted ? (
          <View style={[styles.successBanner, { backgroundColor: colors.successLight }]}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={[styles.successText, { color: colors.success }]}>
              Submitted! Closing modal...
            </Text>
          </View>
        ) : (
          <View style={styles.btnRow}>
            <Button
              title="Close Modal"
              variant="outline"
              onPress={() => router.back()}
              style={styles.btn}
            />
            <Button
              title="Submit & Close"
              variant="primary"
              onPress={handleSubmit}
              style={styles.btn}
            />
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 20,
  },
  badgeRow: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    flex: 1,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  successText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
