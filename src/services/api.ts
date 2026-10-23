import { ApiPost } from '../types';

const FALLBACK_POSTS: ApiPost[] = [
  {
    id: 1,
    userId: 1,
    title: 'Modern React Native Architecture',
    body: 'Expo SDK 58 and React Native 0.88 with the New Architecture enabled bring blazing fast performance and native TurboModules.',
    category: 'Architecture',
  },
  {
    id: 2,
    userId: 1,
    title: 'Type-Safe Routing with Expo Router',
    body: 'File-based routing provides deep linking, native tabs, modals, and automated web routes with full TypeScript type safety.',
    category: 'Routing',
  },
  {
    id: 3,
    userId: 2,
    title: 'Theme-Aware Styling System',
    body: 'Easily switch between System, Dark, and Light modes with reactive color resolution and reusable themed primitives.',
    category: 'UI / UX',
  },
  {
    id: 4,
    userId: 2,
    title: 'Persistent Offline Storage',
    body: 'Seamlessly cache settings, state, and user data with AsyncStorage across app cold starts and sessions.',
    category: 'Storage',
  },
  {
    id: 5,
    userId: 3,
    title: 'Continuous Native Generation',
    body: 'Say goodbye to fragile Xcode and Gradle check-ins. Generate pure native projects on demand with npx expo prebuild.',
    category: 'DevOps',
  },
];

export const api = {
  async fetchPosts(): Promise<ApiPost[]> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return (data as Array<{ id: number; title: string; body: string; userId: number }>).map(
        (post, index) => ({
          ...post,
          category: ['Architecture', 'Routing', 'Design', 'Storage', 'Mobile'][index % 5],
        }),
      );
    } catch (error) {
      console.warn('[api] Failed to fetch remote posts, using fallback demo data:', error);
      // Fallback demo data to ensure app is always 100% functional offline
      return FALLBACK_POSTS;
    }
  },
};
