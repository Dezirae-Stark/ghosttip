/**
 * GhostTip - Crypto Service
 * Main encryption service for encrypting sensitive data at rest
 */

import { deriveEncryptionKey, generateSalt, hashSHA256 } from './kdf';
import { encrypt, decrypt } from './encryption';

/**
 * Main CryptoService for the application
 *
 * Responsibilities:
 * - Derive encryption keys from master key
 * - Encrypt/decrypt sensitive data (OAuth tokens, API keys, etc.)
 * - Hash tokens for lookup
 */
export class CryptoService {
  private encryptionKey: Uint8Array | null = null;
  private initialized = false;

  /**
   * Initialize the crypto service with master key
   * @param masterKey - Master key from environment (MASTER_KEY env var)
   * @param salt - Optional salt (default: static application salt)
   */
  initialize(masterKey: string, salt?: Uint8Array): void {
    if (!masterKey || masterKey.length < 32) {
      throw new Error('Master key must be at least 32 characters');
    }

    const actualSalt = salt || this.getApplicationSalt();
    this.encryptionKey = deriveEncryptionKey(masterKey, actualSalt);
    this.initialized = true;
  }

  /**
   * Encrypt sensitive data
   * @param plaintext - Data to encrypt
   * @returns Base64-encoded ciphertext
   */
  encryptSensitive(plaintext: string): string {
    this.ensureInitialized();
    return encrypt(plaintext, this.encryptionKey!);
  }

  /**
   * Decrypt sensitive data
   * @param ciphertext - Base64-encoded ciphertext
   * @returns Plaintext
   */
  decryptSensitive(ciphertext: string): string {
    this.ensureInitialized();
    return decrypt(ciphertext, this.encryptionKey!);
  }

  /**
   * Hash a token for secure lookup
   * @param token - Token to hash
   * @returns Hex-encoded SHA-256 hash
   */
  hashToken(token: string): string {
    return hashSHA256(token);
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Clear encryption key from memory (e.g., on shutdown)
   */
  destroy(): void {
    if (this.encryptionKey) {
      this.encryptionKey.fill(0); // Zero out memory
      this.encryptionKey = null;
    }
    this.initialized = false;
  }

  private ensureInitialized(): void {
    if (!this.initialized || !this.encryptionKey) {
      throw new Error('CryptoService not initialized. Call initialize() first.');
    }
  }

  /**
   * Get application-wide salt
   * In production, this should be loaded from secure config
   * For now, using a static salt (can be overridden in initialize())
   */
  private getApplicationSalt(): Uint8Array {
    // Static salt for the application
    // In production, consider storing this securely or using a unique salt per deployment
    const staticSalt = 'ghosttip-v1-encryption-salt-2024';
    return new Uint8Array(Buffer.from(staticSalt, 'utf8'));
  }
}

/**
 * Singleton instance
 */
export const cryptoService = new CryptoService();
