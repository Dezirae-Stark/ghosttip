/**
 * GhostTip - Encryption Tests
 */

import { encrypt, decrypt } from './encryption';
import { deriveEncryptionKey, generateSalt } from './kdf';

describe('Encryption', () => {
  let encryptionKey: Uint8Array;

  beforeAll(() => {
    const masterKey = 'test-master-key-with-minimum-32-characters-for-security';
    const salt = generateSalt();
    encryptionKey = deriveEncryptionKey(masterKey, salt);
  });

  test('should encrypt and decrypt data correctly', () => {
    const plaintext = 'Hello, GhostTip!';
    const ciphertext = encrypt(plaintext, encryptionKey);
    const decrypted = decrypt(ciphertext, encryptionKey);

    expect(decrypted).toBe(plaintext);
  });

  test('should produce different ciphertexts for same plaintext', () => {
    const plaintext = 'Test message';
    const ciphertext1 = encrypt(plaintext, encryptionKey);
    const ciphertext2 = encrypt(plaintext, encryptionKey);

    // Different ciphertexts due to different nonces
    expect(ciphertext1).not.toBe(ciphertext2);

    // But both decrypt to same plaintext
    expect(decrypt(ciphertext1, encryptionKey)).toBe(plaintext);
    expect(decrypt(ciphertext2, encryptionKey)).toBe(plaintext);
  });

  test('should throw error on invalid ciphertext', () => {
    const invalidCiphertext = 'invalid-base64-data';

    expect(() => {
      decrypt(invalidCiphertext, encryptionKey);
    }).toThrow();
  });

  test('should throw error on wrong key', () => {
    const plaintext = 'Secret data';
    const ciphertext = encrypt(plaintext, encryptionKey);

    const wrongKey = new Uint8Array(32);
    wrongKey.fill(42);

    expect(() => {
      decrypt(ciphertext, wrongKey);
    }).toThrow('Decryption failed');
  });

  test('should handle Unicode characters', () => {
    const plaintext = '🔒 Secure 日本語 data 🎉';
    const ciphertext = encrypt(plaintext, encryptionKey);
    const decrypted = decrypt(ciphertext, encryptionKey);

    expect(decrypted).toBe(plaintext);
  });

  test('should handle long messages', () => {
    const plaintext = 'A'.repeat(10000);
    const ciphertext = encrypt(plaintext, encryptionKey);
    const decrypted = decrypt(ciphertext, encryptionKey);

    expect(decrypted).toBe(plaintext);
  });
});
