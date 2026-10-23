export type ThemeMode = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSubtle: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export interface Item {
  id: string;
  title: string;
  category: string;
  value: number;
  completed: boolean;
  createdAt: number;
}

export interface ApiPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  category?: string;
}

export type ItemFilter = 'all' | 'active' | 'completed';
