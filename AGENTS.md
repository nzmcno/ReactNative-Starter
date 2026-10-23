# AGENTS.md — AI Agent & Developer Guidelines

> This document defines architecture guidelines, coding rules, testing requirements, and safe workflows for AI coding assistants (Antigravity, Cursor, Claude Code, GitHub Copilot) working in this repository.

---

## 🧭 Project Overview & Stack

- **Framework**: [Expo SDK 58+](https://docs.expo.dev) with **Continuous Native Generation (CNG)**
- **Runtime**: [React Native 0.88+](https://reactnative.dev) with the **New Architecture** (TurboModules) enabled
- **UI & Core**: [React 19+](https://react.dev)
- **Routing & Navigation**: [Expo Router v4](https://docs.expo.dev/router/introduction) (Type-Safe file-based routing)
- **Type System**: [TypeScript 6+](https://www.typescriptlang.org) (strict mode enabled)
- **Testing Engine**: [Vitest](https://vitest.dev) (blazing fast ESM runner with Jest-compatible API)
- **State Management**: React Context (`ThemeContext`, `ItemsContext`) + custom hooks
- **Storage**: Strongly-typed [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Styling**: Theme tokens (`src/constants/Colors.ts`) with Light / Dark / System reactive switching

---

## 🗂️ Repository Structure & Conventions

```text
ReactNative-Starter/
├── app/                       # Expo Router Routes (ONLY routes and layouts)
│   ├── (tabs)/                # Bottom Tab navigator routes
│   │   ├── _layout.tsx        # Tabs layout & tab bar icons
│   │   ├── index.tsx          # Home screen
│   │   ├── components.tsx     # UI components showcase
│   │   ├── items.tsx          # CRUD / Items generator
│   │   ├── explore.tsx        # Remote REST API feed
│   │   └── settings.tsx       # Settings & preferences
│   ├── _layout.tsx            # Root layout, Stack navigator, and Providers
│   ├── modal.tsx              # Native sheet presentation modal
│   └── +not-found.tsx         # 404 handler
├── src/                       # Application Source Code
│   ├── components/ui/         # Reusable atomic UI components
│   ├── constants/             # Design tokens: Colors, Layout, Spacing
│   ├── context/               # Global Context Providers & state
│   ├── hooks/                 # Custom reusable React hooks
│   ├── services/              # API clients & Storage utilities
│   └── types/                 # TypeScript interfaces and models
├── assets/                    # Icons, splash images, media assets
├── __tests__/                 # Vitest test suites
├── .github/                   # CI workflows & issue templates
├── vitest.config.mts          # Vitest configuration (ESM with alias)
├── tsconfig.json              # TypeScript configuration with @/* alias
├── app.json                   # Expo configuration & plugins
└── package.json               # Scripts & dependencies
```

---

## 📋 Architectural Rules & Patterns

### 1. File-Based Routing (`app/`)
- Place screen routes in `app/`. Do not put heavy business logic or deep state definitions in route files; delegate reusable components to `src/components/ui/` and state to `src/context/` or `src/hooks/`.
- Use Expo Router's `<Link>` or `useRouter()` for navigation.
- Use `presentation: 'modal'` in Stack screens for sheet/modal presentations.

### 2. Styling & Theming
- **Never hardcode hex colors** in UI components. Always consume colors from the theme:
  ```tsx
  import { useTheme } from '@/hooks/useTheme';

  const { colors, isDark } = useTheme();
  ```
- Use semantic color tokens: `colors.background`, `colors.surface`, `colors.text`, `colors.border`, `colors.primary`, `colors.danger`, `colors.success`.

### 3. Component Design (`src/components/ui/`)
- Write modular, functional components with typed props.
- In React 19 / TypeScript 6, use `React.ComponentProps<typeof Component>` instead of obsolete `DefaultComponent['props']`.
- Provide accessible touch feedback (`hitSlop`, active opacity, or haptics on press).

### 4. Continuous Native Generation (CNG)
- **Do not commit raw `android/` or `ios/` folders** to version control. They are generated on demand via:
  ```bash
  npx expo prebuild
  ```
- Native permissions and configurations must be added to `app.json` plugins.

---

## 🧪 Testing with Vitest

Tests are located in `__tests__/` and run via **Vitest**:
- Import test utilities directly from `vitest`:
  ```ts
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  ```
- Vitest resolves the `@/*` alias to `./src/*` automatically via `vitest.config.mts`.
- Mock native modules (such as AsyncStorage) cleanly using `vi.mock()`.

---

## ✅ Quality & Verification Commands

Before completing any task, AI agents **MUST** run and pass the following verification checks:

```bash
# 1. Type Check (Strict TypeScript)
npm run type-check

# 2. Linting (ESLint)
npm run lint

# 3. Unit Tests (Vitest)
npm test

# 4. Web Bundle Validation (Smoke Test)
npx expo export --platform web
```

---

## ⚠️ Important Do's and Don'ts for Agents

- **DO** use the `@/*` path alias for imports from `src/` (e.g. `@/components/ui`, `@/constants/Colors`, `@/hooks/useTheme`).
- **DO** keep unit tests up to date when adding new logic, utilities, or components.
- **DO** preserve cross-platform compatibility across iOS, Android, and Web.
- **DON'T** re-introduce deprecated React Native packages (e.g. `@react-native-community/async-storage` or old class components).
- **DON'T** push directly to `master` without running `npm run type-check && npm run lint && npm test`.
