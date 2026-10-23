import { describe, it, expect } from '@jest/globals';
import { Item, ItemFilter } from '../src/types';

describe('Items Logic & Filters', () => {
  const mockItems: Item[] = [
    {
      id: '1',
      title: 'Setup Expo Router',
      category: 'Architecture',
      value: 10,
      completed: true,
      createdAt: 1000,
    },
    {
      id: '2',
      title: 'Configure Jest Tests',
      category: 'DevOps',
      value: 20,
      completed: false,
      createdAt: 2000,
    },
    {
      id: '3',
      title: 'Theme Switching',
      category: 'UI / UX',
      value: 30,
      completed: false,
      createdAt: 3000,
    },
  ];

  const filterItems = (items: Item[], filter: ItemFilter, search: string = '') => {
    return items.filter((item) => {
      if (filter === 'active' && item.completed) return false;
      if (filter === 'completed' && !item.completed) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  };

  it('filters all items when filter is "all"', () => {
    const result = filterItems(mockItems, 'all');
    expect(result).toHaveLength(3);
  });

  it('filters active items only', () => {
    const result = filterItems(mockItems, 'active');
    expect(result).toHaveLength(2);
    expect(result.every((i) => !i.completed)).toBe(true);
  });

  it('filters completed items only', () => {
    const result = filterItems(mockItems, 'completed');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filters by search query', () => {
    const result = filterItems(mockItems, 'all', 'Jest');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Configure Jest Tests');
  });
});
