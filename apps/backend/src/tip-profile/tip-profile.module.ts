/**
 * GhostTip - TipProfile Module
 */

import { Module } from '@nestjs/common';
import { TipProfileService } from './tip-profile.service';
import { TipProfileController } from './tip-profile.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [TipProfileController],
  providers: [TipProfileService, PrismaService],
  exports: [TipProfileService],
})
export class TipProfileModule {}
