/**
 * GhostTip - PaymentMethod Module
 */

import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PrismaService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
