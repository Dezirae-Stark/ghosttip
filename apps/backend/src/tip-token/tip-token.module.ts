/**
 * GhostTip - TipToken Module
 */

import { Module } from '@nestjs/common';
import { TipTokenService } from './tip-token.service';
import { TipTokenController } from './tip-token.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [TipTokenController],
  providers: [TipTokenService, PrismaService],
  exports: [TipTokenService],
})
export class TipTokenModule {}
