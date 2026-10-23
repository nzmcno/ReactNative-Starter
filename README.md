# React Native Starter Kit 🚀

> A modern, production-ready, cross-platform starter kit for **React Native (0.88+)** and **Expo (SDK 58+)**, powered by **Expo Router**, **React 19**, **TypeScript**, and the **New Architecture**.

[![React Native](https://img.shields.io/badge/React%20Native-0.88-blue.svg)](https://reactnative.dev)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-58-black.svg)](https://expo.dev)
[![React](https://img.shields.io/badge/React-19.3-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org)
[![Tests](https://img.shields.io/badge/Tests-Jest-green.svg)](https://jestjs.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📱 Overview

This starter kit is designed to provide everything you need to jumpstart a modern React Native application. It eliminates legacy configuration headaches, provides strict type-safety, features a comprehensive theme system with dark mode persistence, and demonstrates real-world architectural patterns (CRUD state management, async REST API fetching, haptics, responsive styling).

Works seamlessly across **iOS**, **Android**, and **Web** with zero native setup required out of the box.

---

## ✨ Features

- ⚡ **React 19 & New Architecture**: Enabled by default with TurboModules and modern concurrent features.
- 🗂️ **Type-Safe File-Based Routing**: Powered by **Expo Router**, featuring Native Tabs, Native Modals, and deep links.
- 🎨 **Adaptive Theme System**: Light, Dark, and System modes with instant reactive switching and AsyncStorage caching.
- 🧱 **Reusable Component Library**:
  - `Button` (Primary, Secondary, Outline, Danger, Ghost, loading states, icons, haptic feedback)
  - `Card` (Elevated, outlined, flat variants with touch feedback)
  - `Input` (Controlled text inputs, labels, error states, clearable button)
  - `Badge` (Status tags with semantic colors: success, warning, danger, neutral)
  - `Modal` (Accessible modal dialog with blur backdrop and actions)
  - `EmptyState` & `LoadingSpinner` (Polished empty and loading indicators)
- 💾 **Offline-First Persistence**: Strongly-typed `AsyncStorage` service caching items and preferences across restarts.
- 🔄 **Modern CRUD Generator**: Modernized edition of the original list generator showcasing item creation, random generators, filtering, and deletion.
- 🌐 **Async REST API Integration**: Pull-to-refresh feed fetching posts with search filtering and offline fallback data.
- 🧪 **Unit Tests & Quality**: Jest test suites, strict TypeScript (`tsconfig.json`), ESLint, and Prettier configured.
- 📲 **Continuous Native Generation (CNG)**: Clean, zero-bloat repository. Generate pristine native `android/` and `ios/` folders anytime with `npx expo prebuild`.

---

## 📂 Project Structure

```text
ReactNative-Starter/
├── app/                          # Expo Router file-based routes
│   ├── (tabs)/                   # Bottom tab navigator
│   │   ├── _layout.tsx           # Tab bar configuration & icons
│   │   ├── index.tsx             # Home dashboard screen
│   │   ├── components.tsx        # Interactive UI component showcase
│   │   ├── items.tsx             # Modern CRUD list & generator
│   │   ├── explore.tsx           # REST API feed with pull-to-refresh
│   │   └── settings.tsx          # Appearance, storage & system info
│   ├── _layout.tsx               # Root layout & providers (Theme, Items, Safe Area)
│   ├── modal.tsx                 # Native sheet modal screen
│   └── +not-found.tsx            # 404 screen
├── assets/                       # Adaptive app icons, splash screens, demo media
│   └── images/
│       └── car.jpeg              # Starter media asset
├── src/
│   ├── components/
│   │   └── ui/                   # Reusable UI component library
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Modal.tsx
│   │       ├── ThemedText.tsx
│   │       ├── ThemedView.tsx
│   │       └── index.ts
│   ├── constants/
│   │   ├── Colors.ts             # Light & Dark color design tokens
│   │   └── Layout.ts             # Spacing, typography, and layout scales
│   ├── context/
│   │   ├── ItemsContext.tsx      # CRUD state with AsyncStorage sync
│   │   └── ThemeContext.tsx      # Theme state management & persistence
│   ├── hooks/
│   │   ├── useColorScheme.ts     # Platform color scheme hook
│   │   ├── useDebounce.ts        # Search input debounce hook
│   │   └── useTheme.ts           # Easy access to theme tokens & actions
│   ├── services/
│   │   ├── api.ts                # REST API client with offline fallback
│   │   └── storage.ts            # Strongly-typed AsyncStorage wrapper
│   └── types/
│       └── index.ts              # Global TypeScript models & interfaces
├── __tests__/                    # Jest test suites
│   ├── colors.test.ts            # Theme palette integrity tests
│   └── items.test.ts             # State & filter logic tests
├── app.json                      # Expo project configuration
├── babel.config.js               # Babel preset configuration
├── metro.config.js               # Metro bundler configuration
├── tsconfig.json                 # TypeScript strict configuration
└── package.json                  # Scripts & dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` or `v20+` / `v22+` (managed via `nvm` or direct install)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`
- **Mobile Device or Simulator**:
  - Download the **Expo Go** app on your physical iOS (App Store) or Android (Google Play) phone, OR
  - iOS Simulator (macOS + Xcode) / Android Emulator (Android Studio).

### Installation

```bash
# Clone the repository
git clone git@github.com-nzmcno:nzmcno/ReactNative-Starter.git
cd ReactNative-Starter

# Install dependencies
npm install
```

### Running the App

```bash
# Start the Metro development server
npm start
```

Once the interactive CLI opens:
- Press **`s`** to switch to Expo Go if using the mobile app.
- Scan the displayed QR code with your phone camera (iOS) or Expo Go app (Android).
- Press **`i`** to open in the iOS Simulator.
- Press **`a`** to open in the Android Emulator.
- Press **`w`** to open in your Web Browser.

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Starts the interactive Expo Metro bundler |
| `npm run ios` | Boots the app directly into iOS Simulator |
| `npm run android` | Boots the app directly into Android Emulator |
| `npm run web` | Bundles and runs the app in the web browser |
| `npm run type-check` | Executes TypeScript type checking (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint across all files |
| `npm test` | Runs Jest unit tests |
| `npm run prebuild` | Generates pristine native `ios/` and `android/` projects (CNG) |

---

## 🎨 Theming System

The app includes a fully typed color palette for both light and dark themes in `src/constants/Colors.ts`.

To use themed colors in any component:

```tsx
import { useTheme } from '@/hooks/useTheme';

export function MyComponent() {
  const { colors, isDark, themeMode, setThemeMode } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Active Theme: {themeMode}</Text>
    </View>
  );
}
```

---

## 🏗️ Generating Native Projects (Bare Workflow)

This starter uses **Continuous Native Generation (CNG)**. You never need to manage fragile Xcode project files or Gradle scripts by hand.

When you are ready to compile native code, configure custom native libraries, or deploy to app stores:

```bash
npx expo prebuild
```

This will automatically create configured, build-ready `ios/` and `android/` folders customized for your project based on `app.json`.

---

## 🇹🇷 Türkçe Özet & Başlangıç Rehberi

Bu proje, eski 2019 React Native (0.60.4) yapısından tamamen arındırılarak modern, kurumsal standartlarda bir **React Native & Expo Starter Kit** haline getirilmiştir.

### Neler Değiştirildi ve Eklendi?
1. **Güncel Altyapı**: Expo SDK 58, React 19.3 ve React Native 0.88 ile New Architecture (TurboModules) desteği aktif hale getirildi.
2. **Tip Güvenliği (TypeScript)**: Katı tip denetimi (`strict: true`) ve temiz import alias'ları (`@/...`) eklendi.
3. **Expo Router**: Sayfalar dosya tabanlı rota (`app/`) mimarisine geçirildi. Native alt sekmeler (Tabs), modal ekranlar ve 404 sayfası hazırlandı.
4. **Tema Sistemi**: Açık (Light), Koyu (Dark) ve Sistem modu destekli, AsyncStorage ile hafızada saklanan tema motoru kuruldu.
5. **Modern Bileşen Kütüphanesi**: `Button`, `Card`, `Input`, `Badge`, `Modal`, `EmptyState`, `LoadingSpinner` gibi yeniden kullanılabilir UI bileşenleri yazıldı.
6. **Yenilenmiş CRUD / Liste Üreteci**: Orijinal projedeki random generator yapısı; arama, filtreleme (Tümü, Aktif, Tamamlanan) ve kalıcı yerel hafıza (AsyncStorage) ile modernize edildi.
7. **REST API Entegrasyonu**: Sayfayı aşağı çekip yenilemeli (pull-to-refresh) canlı veri çekme ekranı eklendi.
8. **Test & Kalite**: Jest birim testleri, ESLint ve Prettier kuralları tamamlandı.

### Nasıl Çalıştırılır?
```bash
# 1. Proje dizinine girin
cd ReactNative-Starter

# 2. Paketleri yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm start
```
Terminalde çıkan QR kodu telefonunuzdaki **Expo Go** uygulamasıyla okutarak veya `w` tuşuna basarak tarayıcınızda anında test edebilirsiniz!

---

## 📄 License

MIT License. Feel free to use this template for personal learning or commercial production apps.
