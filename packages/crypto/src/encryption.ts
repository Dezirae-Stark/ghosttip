/**
 * GhostTip - Encryption Service
 * Authenticated encryption using XSalsa20-Poly1305 (via TweetNaCl)
 */

import * as nacl from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from 'tweetnacl-util';

/**
 * Encrypt data using XSalsa20-Poly1305 AEAD
 * @param plaintext - Data to encrypt
 * @param key - 32-byte encryption key
 * @returns Base64-encoded ciphertext with nonce prepended
 */
export function encrypt(plaintext: string, key: Uint8Array): string {
  if (key.length !== 32) {
    throw new Error('Encryption key must be 32 bytes');
  }

  const nonce = nacl.randomBytes(24); // 24 bytes for XSalsa20
  const messageUint8 = decodeUTF8(plaintext);
  const ciphertext = nacl.secretbox(messageUint8, nonce, key);

  // Prepend nonce to ciphertext
  const fullMessage = new Uint8Array(nonce.length + ciphertext.length);
  fullMessage.set(nonce);
  fullMessage.set(ciphertext, nonce.length);

  return encodeBase64(fullMessage);
}

/**
 * Decrypt data using XSalsa20-Poly1305 AEAD
 * @param ciphertext - Base64-encoded ciphertext with nonce
 * @param key - 32-byte encryption key
 * @returns Decrypted plaintext
 */
export function decrypt(ciphertext: string, key: Uint8Array): string {
  if (key.length !== 32) {
    throw new Error('Encryption key must be 32 bytes');
  }

  const messageWithNonce = decodeBase64(ciphertext);

  if (messageWithNonce.length < 24) {
    throw new Error('Invalid ciphertext: too short');
  }

  const nonce = messageWithNonce.slice(0, 24);
  const message = messageWithNonce.slice(24);

  const decrypted = nacl.secretbox.open(message, nonce, key);

  if (!decrypted) {
    throw new Error('Decryption failed: authentication tag mismatch or corrupted data');
  }

  return encodeUTF8(decrypted);
}

/**
 * Constant-time comparison to prevent timing attacks
 */
export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return nacl.verify(a, b);
}
