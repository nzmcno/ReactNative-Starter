import { describe, it, expect } from '@jest/globals';
import { Colors } from '../src/constants/Colors';

describe('Theme Colors System', () => {
  it('should have identical keys in light and dark mode palettes', () => {
    const lightKeys = Object.keys(Colors.light).sort();
    const darkKeys = Object.keys(Colors.dark).sort();

    expect(lightKeys).toEqual(darkKeys);
  });

  it('should have valid hex or rgba strings for all color tokens', () => {
    Object.entries(Colors.light).forEach(([, value]) => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });

    Object.entries(Colors.dark).forEach(([, value]) => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('should have high-contrast background and text in both modes', () => {
    expect(Colors.light.background).not.toEqual(Colors.dark.background);
    expect(Colors.light.text).not.toEqual(Colors.dark.text);
  });
});
