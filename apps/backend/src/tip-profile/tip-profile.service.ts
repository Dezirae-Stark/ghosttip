/**
 * GhostTip - TipProfile Service
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateTipProfileDto,
  UpdateTipProfileDto,
  TipProfilePublicView,
} from '@ghosttip/shared';
import { generateTipToken } from '@ghosttip/shared';

@Injectable()
export class TipProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTipProfileDto) {
    // Check if slug is taken
    const existing = await this.prisma.tipProfile.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('Slug already taken');
    }

    // Create profile
    const profile = await this.prisma.tipProfile.create({
      data: {
        userId,
        ...dto,
      },
    });

    // Create default token
    const token = generateTipToken();
    const tokenHash = require('crypto').createHash('sha256').update(token).digest('hex');

    await this.prisma.tipToken.create({
      data: {
        tipProfileId: profile.id,
        token,
        tokenHash,
      },
    });

    return profile;
  }

  async findByUserId(userId: string) {
    return this.prisma.tipProfile.findMany({
      where: { userId },
      include: {
        tipTokens: {
          where: { status: 'ACTIVE' },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<TipProfilePublicView> {
    const profile = await this.prisma.tipProfile.findUnique({
      where: { slug },
      include: {
        user: {
          include: {
            paymentMethods: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });

    if (!profile || !profile.isPublic) {
      throw new NotFoundException('Profile not found');
    }

    return {
      slug: profile.slug,
      displayName: profile.displayName,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      themeSettings: profile.themeSettings as any,
      paymentMethods: profile.user.paymentMethods.map((pm) => ({
        id: pm.id,
        type: pm.type,
        label: pm.label,
        publicHandle: pm.publicHandle,
      })),
    };
  }

  async update(userId: string, profileId: string, dto: UpdateTipProfileDto) {
    const profile = await this.prisma.tipProfile.findFirst({
      where: { id: profileId, userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.tipProfile.update({
      where: { id: profileId },
      data: dto,
    });
  }

  async delete(userId: string, profileId: string) {
    const profile = await this.prisma.tipProfile.findFirst({
      where: { id: profileId, userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    await this.prisma.tipProfile.delete({
      where: { id: profileId },
    });
  }
}
