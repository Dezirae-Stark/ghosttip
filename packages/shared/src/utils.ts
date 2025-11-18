/**
 * GhostTip - Shared Utilities
 */

import { PaymentMethodType } from './types';

/**
 * Generate a human-readable tip token
 * Format: GHOST-XXXX-XXXX
 */
export function generateTipToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Remove ambiguous chars
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `GHOST-${part1}-${part2}`;
}

/**
 * Get payment method display info
 */
export function getPaymentMethodInfo(type: PaymentMethodType): {
  name: string;
  icon: string;
  color: string;
} {
  const info: Record<PaymentMethodType, { name: string; icon: string; color: string }> = {
    [PaymentMethodType.CASH_APP]: {
      name: 'Cash App',
      icon: 'dollar-sign',
      color: '#00D632',
    },
    [PaymentMethodType.VENMO]: {
      name: 'Venmo',
      icon: 'smartphone',
      color: '#3D95CE',
    },
    [PaymentMethodType.PAYPAL]: {
      name: 'PayPal',
      icon: 'credit-card',
      color: '#0070BA',
    },
    [PaymentMethodType.BTC]: {
      name: 'Bitcoin',
      icon: 'bitcoin',
      color: '#F7931A',
    },
    [PaymentMethodType.ETH]: {
      name: 'Ethereum',
      icon: 'hexagon',
      color: '#627EEA',
    },
    [PaymentMethodType.XMR]: {
      name: 'Monero',
      icon: 'shield',
      color: '#FF6600',
    },
    [PaymentMethodType.LIGHTNING]: {
      name: 'Lightning',
      icon: 'zap',
      color: '#FFEB3B',
    },
    [PaymentMethodType.OTHER]: {
      name: 'Other',
      icon: 'more-horizontal',
      color: '#6B7280',
    },
  };
  return info[type];
}

/**
 * Format payment handle for display
 */
export function formatPaymentHandle(type: PaymentMethodType, handle: string): string {
  switch (type) {
    case PaymentMethodType.CASH_APP:
      return handle.startsWith('$') ? handle : `$${handle}`;
    case PaymentMethodType.VENMO:
      return handle.startsWith('@') ? handle : `@${handle}`;
    case PaymentMethodType.BTC:
    case PaymentMethodType.ETH:
    case PaymentMethodType.XMR:
      // Truncate long addresses for display
      if (handle.length > 20) {
        return `${handle.slice(0, 10)}...${handle.slice(-8)}`;
      }
      return handle;
    default:
      return handle;
  }
}

/**
 * Build shareable tip URL
 */
export function buildTipUrl(baseUrl: string, slugOrToken: string, isToken = false): string {
  const prefix = isToken ? '/t' : '/u';
  return `${baseUrl}${prefix}/${slugOrToken}`;
}

/**
 * Sanitize user input (basic XSS prevention)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate slug availability (client-side check before API call)
 */
export function isValidSlug(slug: string): boolean {
  const reserved = ['api', 'admin', 'auth', 'login', 'register', 'ghost', 'tip', 'tips'];
  return !reserved.includes(slug.toLowerCase());
}
