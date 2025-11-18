/**
 * GhostTip - Shared Utils Tests
 */

import { generateTipToken, isValidSlug, sanitizeInput, buildTipUrl } from './utils';

describe('Shared Utils', () => {
  describe('generateTipToken', () => {
    test('should generate token in correct format', () => {
      const token = generateTipToken();
      expect(token).toMatch(/^GHOST-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    });

    test('should generate unique tokens', () => {
      const tokens = new Set();
      for (let i = 0; i < 100; i++) {
        tokens.add(generateTipToken());
      }
      expect(tokens.size).toBe(100);
    });
  });

  describe('isValidSlug', () => {
    test('should reject reserved slugs', () => {
      expect(isValidSlug('api')).toBe(false);
      expect(isValidSlug('admin')).toBe(false);
      expect(isValidSlug('auth')).toBe(false);
    });

    test('should accept valid slugs', () => {
      expect(isValidSlug('johndoe')).toBe(true);
      expect(isValidSlug('creator123')).toBe(true);
      expect(isValidSlug('my-handle')).toBe(true);
    });
  });

  describe('sanitizeInput', () => {
    test('should escape HTML characters', () => {
      const input = '<script>alert("XSS")</script>';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });

    test('should escape quotes', () => {
      const input = 'He said "hello"';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('&quot;');
    });
  });

  describe('buildTipUrl', () => {
    test('should build profile URL correctly', () => {
      const url = buildTipUrl('https://ghosttip.com', 'johndoe', false);
      expect(url).toBe('https://ghosttip.com/u/johndoe');
    });

    test('should build token URL correctly', () => {
      const url = buildTipUrl('https://ghosttip.com', 'GHOST-ABCD-1234', true);
      expect(url).toBe('https://ghosttip.com/t/GHOST-ABCD-1234');
    });
  });
});
