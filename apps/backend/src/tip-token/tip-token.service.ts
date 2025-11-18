/**
 * GhostTip - TipToken Service
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { generateTipToken } from '@ghosttip/shared';
import { cryptoService } from '@ghosttip/crypto';

@Injectable()
export class TipTokenService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, tipProfileId: string, label?: string) {
    // Verify profile belongs to user
    const profile = await this.prisma.tipProfile.findFirst({
      where: { id: tipProfileId, userId },
    });

    if (!profile) {
      throw new ForbiddenException('Profile not found or access denied');
    }

    const token = generateTipToken();
    const tokenHash = cryptoService.hashToken(token);

    return this.prisma.tipToken.create({
      data: {
        tipProfileId,
        token,
        tokenHash,
        label,
      },
    });
  }

  async findByProfileId(userId: string, tipProfileId: string) {
    // Verify profile belongs to user
    const profile = await this.prisma.tipProfile.findFirst({
      where: { id: tipProfileId, userId },
    });

    if (!profile) {
      throw new ForbiddenException('Profile not found or access denied');
    }

    return this.prisma.tipToken.findMany({
      where: {
        tipProfileId,
        status: 'ACTIVE',
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revoke(userId: string, tokenId: string) {
    // Verify token belongs to user's profile
    const token = await this.prisma.tipToken.findUnique({
      where: { id: tokenId },
      include: { tipProfile: true },
    });

    if (!token || token.tipProfile.userId !== userId) {
      throw new ForbiddenException('Token not found or access denied');
    }

    return this.prisma.tipToken.update({
      where: { id: tokenId },
      data: { status: 'REVOKED' },
    });
  }

  async resolveToken(token: string) {
    const tipToken = await this.prisma.tipToken.findUnique({
      where: { token },
      include: {
        tipProfile: {
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
        },
      },
    });

    if (!tipToken || tipToken.status !== 'ACTIVE') {
      throw new NotFoundException('Token not found or expired');
    }

    // Return public view
    return {
      slug: tipToken.tipProfile.slug,
      displayName: tipToken.tipProfile.displayName,
      bio: tipToken.tipProfile.bio,
      avatarUrl: tipToken.tipProfile.avatarUrl,
      themeSettings: tipToken.tipProfile.themeSettings,
      paymentMethods: tipToken.tipProfile.user.paymentMethods.map((pm) => ({
        id: pm.id,
        type: pm.type,
        label: pm.label,
        publicHandle: pm.publicHandle,
      })),
    };
  }
}
