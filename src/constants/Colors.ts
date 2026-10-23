import { ThemeColors } from '../types';

export const Colors: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    primary: '#4F46E5', // Indigo 600
    primaryLight: '#EEF2FF',
    primaryDark: '#3730A3',
    secondary: '#0EA5E9', // Sky 500
    success: '#10B981', // Emerald 500
    successLight: '#ECFDF5',
    warning: '#F59E0B', // Amber 500
    warningLight: '#FFFBEB',
    danger: '#EF4444', // Red 500
    dangerLight: '#FEF2F2',
    tint: '#4F46E5',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#4F46E5',
  },
  dark: {
    background: '#0B0F19',
    surface: '#151C2C',
    surfaceSubtle: '#1E293B',
    card: '#151C2C',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#1E293B',
    borderLight: '#334155',
    primary: '#6366F1', // Indigo 500
    primaryLight: '#1E1B4B',
    primaryDark: '#818CF8',
    secondary: '#38BDF8',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    danger: '#F87171',
    dangerLight: '#7F1D1D',
    tint: '#818CF8',
    tabIconDefault: '#64748B',
    tabIconSelected: '#818CF8',
  },
};
