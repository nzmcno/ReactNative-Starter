import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../services/storage';
import { Item, ItemFilter } from '../types';

interface ItemsContextType {
  items: Item[];
  filter: ItemFilter;
  searchQuery: string;
  filteredItems: Item[];
  addItem: (title: string, category?: string) => void;
  addRandomItem: () => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearItems: () => void;
  setFilter: (filter: ItemFilter) => void;
  setSearchQuery: (query: string) => void;
}

const STORAGE_KEY = '@rn_starter_items';

const INITIAL_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Explore modern Expo Router navigation',
    category: 'Architecture',
    value: 42,
    completed: true,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '2',
    title: 'Test Light & Dark mode switching',
    category: 'UI / UX',
    value: 88,
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '3',
    title: 'Try adding a random item or create your own',
    category: 'Components',
    value: 13,
    completed: false,
    createdAt: Date.now(),
  },
];

const SAMPLE_CATEGORIES = ['Architecture', 'UI / UX', 'Components', 'Performance', 'DevOps'];
const SAMPLE_TITLES = [
  'Inspect React 19 concurrent features',
  'Verify TypeScript strict types',
  'Optimize FlatList render cycles',
  'Test offline AsyncStorage cache',
  'Configure Expo push notifications',
  'Generate native iOS & Android with prebuild',
  'Review accessibility labels & contrast',
];

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<ItemFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    storage.get<Item[]>(STORAGE_KEY, INITIAL_ITEMS).then((stored) => {
      setItems(stored);
      setIsLoaded(true);
    });
  }, []);

  const saveItems = (newItems: Item[]) => {
    setItems(newItems);
    storage.set(STORAGE_KEY, newItems);
  };

  const addItem = (title: string, category: string = 'General') => {
    if (!title.trim()) return;
    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      value: Math.floor(Math.random() * 100) + 1,
      completed: false,
      createdAt: Date.now(),
    };
    saveItems([newItem, ...items]);
  };

  const addRandomItem = () => {
    const randomTitle =
      SAMPLE_TITLES[Math.floor(Math.random() * SAMPLE_TITLES.length)] +
      ` (#${Math.floor(Math.random() * 900) + 100})`;
    const randomCategory =
      SAMPLE_CATEGORIES[Math.floor(Math.random() * SAMPLE_CATEGORIES.length)];
    const randomValue = Math.floor(Math.random() * 100) + 1;

    const newItem: Item = {
      id: Date.now().toString(),
      title: randomTitle,
      category: randomCategory,
      value: randomValue,
      completed: false,
      createdAt: Date.now(),
    };
    saveItems([newItem, ...items]);
  };

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    saveItems(updated);
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  const clearItems = () => {
    saveItems([]);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'active' && item.completed) return false;
    if (filter === 'completed' && !item.completed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        filter,
        searchQuery,
        filteredItems,
        addItem,
        addRandomItem,
        toggleItem,
        deleteItem,
        clearItems,
        setFilter,
        setSearchQuery,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export function useItems(): ItemsContextType {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
