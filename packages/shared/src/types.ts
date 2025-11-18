/**
 * GhostTip - Shared Types
 * Domain types and DTOs used across the platform
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum PaymentMethodType {
  CASH_APP = 'CASH_APP',
  VENMO = 'VENMO',
  PAYPAL = 'PAYPAL',
  BTC = 'BTC',
  ETH = 'ETH',
  XMR = 'XMR',
  LIGHTNING = 'LIGHTNING',
  OTHER = 'OTHER',
}

export enum TipTokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// ============================================================================
// DOMAIN TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  displayAlias: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  label: string;
  publicHandle: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TipProfile {
  id: string;
  userId: string;
  slug: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  themeSettings?: ThemeSettings;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TipToken {
  id: string;
  tipProfileId: string;
  token: string;
  status: TipTokenStatus;
  label?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TipEvent {
  id: string;
  tipProfileId: string;
  tipTokenId?: string;
  paymentMethodId?: string;
  paymentMethodType?: PaymentMethodType;
  referrer?: string;
  createdAt: Date;
}

// ============================================================================
// THEME & UI TYPES
// ============================================================================

export type AccentColor = 'cyan' | 'magenta' | 'purple' | 'green';
export type ThemeVariant = 'neon' | 'dark' | 'matrix';

export interface ThemeSettings {
  accentColor: AccentColor;
  variant: ThemeVariant;
}

// ============================================================================
// DTOs (Data Transfer Objects)
// ============================================================================

// Auth DTOs
export interface RegisterDto {
  email: string;
  password: string;
  displayAlias: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
}

// TipProfile DTOs
export interface CreateTipProfileDto {
  slug: string;
  displayName: string;
  bio?: string;
  themeSettings?: ThemeSettings;
}

export interface UpdateTipProfileDto {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  themeSettings?: ThemeSettings;
  isPublic?: boolean;
}

export interface TipProfilePublicView {
  slug: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  themeSettings?: ThemeSettings;
  paymentMethods: PaymentMethodPublicView[];
}

// PaymentMethod DTOs
export interface CreatePaymentMethodDto {
  type: PaymentMethodType;
  label: string;
  publicHandle: string;
  encryptedCredentials?: string; // Already encrypted on client side for some use cases
}

export interface UpdatePaymentMethodDto {
  label?: string;
  publicHandle?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface PaymentMethodPublicView {
  id: string;
  type: PaymentMethodType;
  label: string;
  publicHandle: string;
}

// TipToken DTOs
export interface CreateTipTokenDto {
  tipProfileId: string;
  label?: string;
  expiresAt?: Date;
}

export interface TipTokenResponse {
  id: string;
  token: string;
  label?: string;
  status: TipTokenStatus;
  expiresAt?: Date;
  url: string; // Full URL for easy sharing
}

// TipEvent DTOs
export interface CreateTipEventDto {
  tipProfileId: string;
  tipTokenId?: string;
  paymentMethodId?: string;
  paymentMethodType?: PaymentMethodType;
  referrer?: string;
}

// Analytics
export interface TipAnalytics {
  totalClicks: number;
  clicksByMethod: Record<PaymentMethodType, number>;
  clicksByReferrer: Record<string, number>;
  recentEvents: TipEvent[];
}
