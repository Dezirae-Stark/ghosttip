/**
 * GhostTip - Auth Service
 * Handles user authentication and token management
 */

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../common/prisma.service';
import { RegisterDto, LoginDto, AuthResponse } from '@ghosttip/shared';
import { cryptoService } from '@ghosttip/crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    // Check if user exists
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { displayAlias: dto.displayAlias }],
      },
    });

    if (existing) {
      if (existing.email === dto.email) {
        throw new ConflictException('Email already registered');
      }
      throw new ConflictException('Display alias already taken');
    }

    // Hash password
    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MiB
      timeCost: 3,
      parallelism: 4,
    });

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        displayAlias: dto.displayAlias,
      },
    });

    // Generate tokens
    return this.generateAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return this.generateAuthResponse(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const tokenHash = cryptoService.hashToken(refreshToken);

      // Check if refresh token exists and is valid
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { tokenHash },
        include: { user: true },
      });

      if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateAuthResponse(storedToken.user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    const tokenHash = cryptoService.hashToken(refreshToken);
    await this.prisma.refreshToken.updateMany({
      where: { userId, tokenHash },
      data: { revokedAt: new Date() },
    });
  }

  private async generateAuthResponse(user: any): Promise<AuthResponse> {
    const payload = { sub: user.id, email: user.email };

    // Access token (15 min)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });

    // Refresh token (7 days)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    // Store refresh token
    const tokenHash = cryptoService.hashToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    // Remove sensitive data
    const { passwordHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      // In production, refreshToken should be set as httpOnly cookie
    };
  }
}
