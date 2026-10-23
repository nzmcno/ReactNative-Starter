import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { api } from '../../src/services/api';
import { ApiPost } from '../../src/types';
import {
  Badge,
  Card,
  EmptyState,
  Input,
  LoadingSpinner,
} from '../../src/components/ui';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const data = await api.fetchPosts();
      setPosts(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()),
  );

  const renderPost = ({ item }: { item: ApiPost }) => {
    const isExpanded = expandedId === item.id;

    return (
      <Card
        variant="outlined"
        style={styles.postCard}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
      >
        <View style={styles.postHeader}>
          {item.category && (
            <Badge label={item.category} size="sm" variant="primary" />
          )}
          <Text style={[styles.postId, { color: colors.textMuted }]}>
            #{item.id}
          </Text>
        </View>

        <Text style={[styles.postTitle, { color: colors.text }]}>
          {item.title}
        </Text>

        <Text
          numberOfLines={isExpanded ? undefined : 2}
          style={[styles.postBody, { color: colors.textSecondary }]}
        >
          {item.body}
        </Text>

        <View style={styles.postFooter}>
          <Text style={[styles.expandText, { color: colors.primary }]}>
            {isExpanded ? 'Show less' : 'Read more'}
          </Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={colors.primary}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View
        style={[
          styles.headerSection,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Input
          placeholder="Filter posts & articles..."
          value={search}
          onChangeText={setSearch}
          leftIcon={<Ionicons name="search" size={18} color={colors.textMuted} />}
          containerStyle={styles.searchInput}
        />
      </View>

      {/* Main Content */}
      {loading ? (
        <LoadingSpinner message="Fetching remote data..." />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          ListEmptyComponent={
            <EmptyState
              icon="cloud-offline-outline"
              title="No Posts Found"
              description="Could not find any articles matching your search criteria."
              actionLabel="Reset Search"
              onAction={() => setSearch('')}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  searchInput: {
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  postCard: {
    marginBottom: 12,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postId: {
    fontSize: 12,
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 4,
  },
  expandText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
