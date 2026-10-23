import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
} from '../../src/components/ui';

export default function ComponentsShowcase() {
  const { colors } = useTheme();

  // Component states
  const [inputText, setInputText] = useState('React Native 2026');
  const [inputError, setInputError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleValidate = () => {
    if (!inputText.trim()) {
      setInputError('This field cannot be empty');
    } else {
      setInputError('');
      if (Platform.OS === 'web') {
        window.alert(`Input is valid: "${inputText}"`);
      } else {
        Alert.alert('Success', `Input value: "${inputText}"`);
      }
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Introduction */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Interactive Component Library
      </Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
        Pre-built, accessible, theme-aware components ready for production use.
      </Text>

      {/* Buttons Section */}
      <Card variant="outlined" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Buttons & States
        </Text>

        <View style={styles.controlsRow}>
          <View style={styles.controlItem}>
            <Text style={[styles.controlLabel, { color: colors.textSecondary }]}>
              Loading
            </Text>
            <Switch
              value={isLoading}
              onValueChange={setIsLoading}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <View style={styles.controlItem}>
            <Text style={[styles.controlLabel, { color: colors.textSecondary }]}>
              Disabled
            </Text>
            <Switch
              value={isDisabled}
              onValueChange={setIsDisabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        <View style={styles.buttonColumn}>
          <Button
            title="Primary Button"
            variant="primary"
            loading={isLoading}
            disabled={isDisabled}
            icon={<Ionicons name="sparkles" size={16} color="#FFFFFF" />}
            onPress={() => Alert.alert('Pressed', 'Primary button tapped!')}
          />
          <Button
            title="Secondary Button"
            variant="secondary"
            loading={isLoading}
            disabled={isDisabled}
            onPress={() => Alert.alert('Pressed', 'Secondary button tapped!')}
          />
          <Button
            title="Outline Button"
            variant="outline"
            loading={isLoading}
            disabled={isDisabled}
            onPress={() => Alert.alert('Pressed', 'Outline button tapped!')}
          />
          <Button
            title="Danger Action"
            variant="danger"
            loading={isLoading}
            disabled={isDisabled}
            icon={<Ionicons name="trash-outline" size={16} color="#FFFFFF" />}
            onPress={() => Alert.alert('Danger', 'Destructive action tapped!')}
          />
          <Button
            title="Ghost Text Button"
            variant="ghost"
            loading={isLoading}
            disabled={isDisabled}
            onPress={() => Alert.alert('Ghost', 'Ghost button tapped!')}
          />
        </View>
      </Card>

      {/* Inputs Section */}
      <Card variant="outlined" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Form Inputs & Validation
        </Text>

        <Input
          label="App Name / Title"
          placeholder="Enter a title..."
          value={inputText}
          onChangeText={(t) => {
            setInputText(t);
            if (inputError) setInputError('');
          }}
          error={inputError}
          leftIcon={<Ionicons name="text-outline" size={18} color={colors.textMuted} />}
          helperText="Supports live clearing and error messaging"
        />

        <Button
          title="Validate Input"
          variant="secondary"
          size="sm"
          onPress={handleValidate}
        />
      </Card>

      {/* Badges Section */}
      <Card variant="outlined" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Status Badges & Tags
        </Text>
        <View style={styles.badgeRow}>
          <Badge label="Primary" variant="primary" />
          <Badge label="Active" variant="success" />
          <Badge label="Pending" variant="warning" />
          <Badge label="Error" variant="danger" />
          <Badge label="Archived" variant="neutral" />
        </View>
      </Card>

      {/* Dialog Modal Section */}
      <Card variant="outlined" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Reusable Modal Dialog
        </Text>
        <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
          A polished dialog component with blur backdrop, responsive width, and customizable action buttons.
        </Text>

        <Button
          title="Open Reusable Modal"
          variant="primary"
          icon={<Ionicons name="chatbubbles-outline" size={16} color="#FFFFFF" />}
          onPress={() => setIsModalOpen(true)}
        />
      </Card>

      {/* Active Modal Dialog */}
      <Modal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Custom Modal Dialog"
        description="This modal component is fully theme-aware and runs smoothly on both iOS and Android."
        secondaryAction={{
          label: 'Dismiss',
          onPress: () => setIsModalOpen(false),
        }}
        primaryAction={{
          label: 'Confirm Action',
          onPress: () => {
            setIsModalOpen(false);
            if (Platform.OS === 'web') {
              window.alert('Action confirmed!');
            } else {
              Alert.alert('Success', 'Action confirmed successfully!');
            }
          },
        }}
      >
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, { color: colors.text }]}>
            You can embed any custom content, forms, or data views inside this modal container.
          </Text>
        </View>
      </Modal>
    </ScrollView>
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  controlItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonColumn: {
    gap: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalContent: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
