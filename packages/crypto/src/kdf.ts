/**
 * GhostTip - Key Derivation
 * Argon2id-based key derivation for master key -> encryption keys
 */

import { argon2id } from '@noble/hashes/argon2';
import { sha256 } from '@noble/hashes/sha256';

/**
 * Derive encryption key from master key
 * Uses Argon2id for slow, memory-hard key derivation
 */
export function deriveEncryptionKey(
  masterKey: string,
  salt: Uint8Array,
  options: {
    memorySize?: number; // in KiB
    iterations?: number;
    parallelism?: number;
  } = {}
): Uint8Array {
  const {
    memorySize = 65536, // 64 MiB
    iterations = 3,
    parallelism = 4,
  } = options;

  return argon2id(
    Buffer.from(masterKey, 'utf8'),
    salt,
    {
      m: memorySize,
      t: iterations,
      p: parallelism,
    }
  );
}

/**
 * Generate a random salt
 */
export function generateSalt(): Uint8Array {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const salt = new Uint8Array(32);
    crypto.getRandomValues(salt);
    return salt;
  }
  // Node.js fallback
  const { randomBytes } = require('crypto');
  return new Uint8Array(randomBytes(32));
}

/**
 * Hash data using SHA-256
 * Used for token hashing, etc.
 */
export function hashSHA256(data: string): string {
  const hash = sha256(Buffer.from(data, 'utf8'));
  return Buffer.from(hash).toString('hex');
}
