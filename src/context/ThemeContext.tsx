import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { storage } from '../services/storage';
import { ResolvedTheme, ThemeColors, ThemeMode } from '../types';

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  colors: ThemeColors;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = '@rn_starter_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme() ?? 'light';
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    storage.get<ThemeMode>(STORAGE_KEY, 'system').then((stored) => {
      setThemeModeState(stored);
      setIsLoaded(true);
    });
  }, []);

  const resolvedTheme: ResolvedTheme =
    themeMode === 'system' ? (deviceColorScheme === 'dark' ? 'dark' : 'light') : themeMode;

  const colors = Colors[resolvedTheme];
  const isDark = resolvedTheme === 'dark';

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    storage.set(STORAGE_KEY, mode);
  };

  const toggleTheme = () => {
    const nextMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedTheme,
        colors,
        isDark,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
