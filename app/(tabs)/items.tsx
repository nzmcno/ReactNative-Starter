import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { useItems } from '../../src/context/ItemsContext';
import { Item, ItemFilter } from '../../src/types';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
} from '../../src/components/ui';

export default function ItemsGeneratorScreen() {
  const { colors } = useTheme();
  const {
    filteredItems,
    filter,
    searchQuery,
    addItem,
    addRandomItem,
    toggleItem,
    deleteItem,
    clearItems,
    setFilter,
  } = useItems();

  const [newTitle, setNewTitle] = useState('');
  const newCategory = 'Task';

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addItem(newTitle, newCategory);
    setNewTitle('');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <Card
      variant="outlined"
      style={[
        styles.itemCard,
        item.completed && { opacity: 0.75 },
      ]}
    >
      <Pressable
        onPress={() => toggleItem(item.id)}
        style={styles.itemCheckbox}
        hitSlop={8}
      >
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.completed ? colors.success : colors.textMuted}
        />
      </Pressable>

      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Badge label={item.category} size="sm" variant="neutral" />
          <Text style={[styles.itemValue, { color: colors.textMuted }]}>
            Val: {item.value}
          </Text>
        </View>

        <Text
          style={[
            styles.itemTitle,
            { color: colors.text },
            item.completed && styles.itemTitleCompleted,
          ]}
        >
          {item.title}
        </Text>
      </View>

      <Pressable
        onPress={() => deleteItem(item.id)}
        style={[styles.deleteBtn, { backgroundColor: colors.surfaceSubtle }]}
        hitSlop={8}
      >
        <Ionicons name="trash-outline" size={18} color={colors.danger} />
      </Pressable>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Input & Actions Container */}
      <View style={[styles.topSection, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.inputRow}>
          <Input
            placeholder="Add a new item or task..."
            value={newTitle}
            onChangeText={setNewTitle}
            containerStyle={styles.addInput}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <Button
            title="Add"
            variant="primary"
            size="md"
            onPress={handleAdd}
            style={styles.addBtn}
          />
        </View>

        <View style={styles.actionRow}>
          <Button
            title="Generate Random"
            variant="secondary"
            size="sm"
            icon={<Ionicons name="sparkles" size={14} color={colors.primary} />}
            onPress={addRandomItem}
            style={styles.genBtn}
          />
          {filteredItems.length > 0 && (
            <Button
              title="Clear All"
              variant="ghost"
              size="sm"
              onPress={clearItems}
            />
          )}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['all', 'active', 'completed'] as ItemFilter[]).map((f) => {
            const isSelected = filter === f;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.surfaceSubtle,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    },
                  ]}
                >
                  {f.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* List Items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="sparkles-outline"
            title="No Items Found"
            description={
              searchQuery
                ? `No items match "${searchQuery}"`
                : 'Tap "Generate Random" or add an item above to test the modern CRUD generator.'
            }
            actionLabel="Generate An Item"
            onAction={addRandomItem}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  addInput: {
    flex: 1,
    marginBottom: 0,
  },
  addBtn: {
    height: 46,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  genBtn: {
    flexShrink: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
  },
  itemCheckbox: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});
