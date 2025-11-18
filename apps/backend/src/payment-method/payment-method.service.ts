/**
 * GhostTip - PaymentMethod Service
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { cryptoService } from '@ghosttip/crypto';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '@ghosttip/shared';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePaymentMethodDto) {
    // Encrypt credentials if provided
    let encryptedCredentials: string | undefined;
    if (dto.encryptedCredentials) {
      encryptedCredentials = cryptoService.encryptSensitive(dto.encryptedCredentials);
    }

    return this.prisma.paymentMethod.create({
      data: {
        userId,
        type: dto.type,
        label: dto.label,
        publicHandle: dto.publicHandle,
        encryptedCredentials,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.paymentMethod.findMany({
      where: { userId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async update(userId: string, methodId: string, dto: UpdatePaymentMethodDto) {
    const method = await this.prisma.paymentMethod.findFirst({
      where: { id: methodId, userId },
    });

    if (!method) {
      throw new NotFoundException('Payment method not found');
    }

    return this.prisma.paymentMethod.update({
      where: { id: methodId },
      data: dto,
    });
  }

  async delete(userId: string, methodId: string) {
    const method = await this.prisma.paymentMethod.findFirst({
      where: { id: methodId, userId },
    });

    if (!method) {
      throw new NotFoundException('Payment method not found');
    }

    await this.prisma.paymentMethod.delete({
      where: { id: methodId },
    });
  }
}
