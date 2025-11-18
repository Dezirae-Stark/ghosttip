/**
 * GhostTip Backend - App Module
 */

import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { TipProfileModule } from './tip-profile/tip-profile.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { TipTokenModule } from './tip-token/tip-token.module';
import { PrismaService } from './common/prisma.service';
import { cryptoService } from '@ghosttip/crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100,
      },
    ]),
    AuthModule,
    TipProfileModule,
    PaymentMethodModule,
    TipTokenModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    // Initialize crypto service
    const masterKey = process.env.MASTER_KEY || 'dev-master-key-change-in-production-min-32-chars';
    if (masterKey.length < 32) {
      console.warn('⚠️  MASTER_KEY should be at least 32 characters');
    }
    cryptoService.initialize(masterKey);
    console.log('✅ CryptoService initialized');
  }
}
