/**
 * GhostTip - CryptoService Tests
 */

import { CryptoService } from './crypto-service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    service = new CryptoService();
  });

  afterEach(() => {
    service.destroy();
  });

  test('should initialize with master key', () => {
    const masterKey = 'test-master-key-minimum-32-characters-required';
    service.initialize(masterKey);

    expect(service.isInitialized()).toBe(true);
  });

  test('should throw error if master key is too short', () => {
    const shortKey = 'short';

    expect(() => {
      service.initialize(shortKey);
    }).toThrow('Master key must be at least 32 characters');
  });

  test('should encrypt and decrypt sensitive data', () => {
    service.initialize('test-master-key-minimum-32-characters-required');

    const plaintext = 'oauth-token-12345';
    const encrypted = service.encryptSensitive(plaintext);
    const decrypted = service.decryptSensitive(encrypted);

    expect(decrypted).toBe(plaintext);
    expect(encrypted).not.toBe(plaintext);
  });

  test('should throw error when not initialized', () => {
    expect(() => {
      service.encryptSensitive('test');
    }).toThrow('CryptoService not initialized');
  });

  test('should hash tokens consistently', () => {
    service.initialize('test-master-key-minimum-32-characters-required');

    const token = 'GHOST-ABCD-1234';
    const hash1 = service.hashToken(token);
    const hash2 = service.hashToken(token);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 hex length
  });

  test('should produce different hashes for different tokens', () => {
    service.initialize('test-master-key-minimum-32-characters-required');

    const token1 = 'GHOST-AAAA-1111';
    const token2 = 'GHOST-BBBB-2222';

    const hash1 = service.hashToken(token1);
    const hash2 = service.hashToken(token2);

    expect(hash1).not.toBe(hash2);
  });

  test('should clear encryption key on destroy', () => {
    service.initialize('test-master-key-minimum-32-characters-required');
    expect(service.isInitialized()).toBe(true);

    service.destroy();
    expect(service.isInitialized()).toBe(false);
  });
});
