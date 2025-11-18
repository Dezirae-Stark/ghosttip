/**
 * GhostTip - Validation Schemas
 * Zod schemas for runtime validation of DTOs
 */

import { z } from 'zod';
import { PaymentMethodType, TipTokenStatus, AccentColor, ThemeVariant } from './types';

// ============================================================================
// ENUMS
// ============================================================================

export const PaymentMethodTypeSchema = z.nativeEnum(PaymentMethodType);
export const TipTokenStatusSchema = z.nativeEnum(TipTokenStatus);
export const AccentColorSchema = z.enum(['cyan', 'magenta', 'purple', 'green']);
export const ThemeVariantSchema = z.enum(['neon', 'dark', 'matrix']);

// ============================================================================
// THEME SETTINGS
// ============================================================================

export const ThemeSettingsSchema = z.object({
  accentColor: AccentColorSchema,
  variant: ThemeVariantSchema,
});

// ============================================================================
// AUTH VALIDATION
// ============================================================================

export const RegisterDtoSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  displayAlias: z
    .string()
    .min(3, 'Alias must be at least 3 characters')
    .max(30, 'Alias must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Alias can only contain letters, numbers, underscores, and hyphens'),
});

export const LoginDtoSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ============================================================================
// TIP PROFILE VALIDATION
// ============================================================================

export const CreateTipProfileDtoSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be at most 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .regex(/^[a-z]/, 'Slug must start with a letter')
    .regex(/[^-]$/, 'Slug cannot end with a hyphen'),
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(100, 'Display name must be at most 100 characters'),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
  themeSettings: ThemeSettingsSchema.optional(),
});

export const UpdateTipProfileDtoSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional(),
  themeSettings: ThemeSettingsSchema.optional(),
  isPublic: z.boolean().optional(),
});

// ============================================================================
// PAYMENT METHOD VALIDATION
// ============================================================================

export const CreatePaymentMethodDtoSchema = z.object({
  type: PaymentMethodTypeSchema,
  label: z
    .string()
    .min(1, 'Label is required')
    .max(100, 'Label must be at most 100 characters'),
  publicHandle: z
    .string()
    .min(1, 'Public handle is required')
    .max(500, 'Public handle must be at most 500 characters'),
  encryptedCredentials: z.string().optional(),
});

export const UpdatePaymentMethodDtoSchema = z.object({
  label: z.string().min(1).max(100).optional(),
  publicHandle: z.string().min(1).max(500).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

// ============================================================================
// TIP TOKEN VALIDATION
// ============================================================================

export const CreateTipTokenDtoSchema = z.object({
  tipProfileId: z.string().cuid(),
  label: z.string().max(100).optional(),
  expiresAt: z.coerce.date().optional(),
});

// ============================================================================
// TIP EVENT VALIDATION
// ============================================================================

export const CreateTipEventDtoSchema = z.object({
  tipProfileId: z.string().cuid(),
  tipTokenId: z.string().cuid().optional(),
  paymentMethodId: z.string().cuid().optional(),
  paymentMethodType: PaymentMethodTypeSchema.optional(),
  referrer: z.string().max(200).optional(),
});

// ============================================================================
// UTILITY VALIDATORS
// ============================================================================

export const IdParamSchema = z.object({
  id: z.string().cuid(),
});

export const SlugParamSchema = z.object({
  slug: z.string().min(3).max(50),
});

export const TokenParamSchema = z.object({
  token: z.string().min(1),
});
