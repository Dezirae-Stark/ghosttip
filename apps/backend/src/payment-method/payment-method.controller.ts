/**
 * GhostTip - PaymentMethod Controller
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '@ghosttip/shared';

@Controller('payment-methods')
@UseGuards(AuthGuard('jwt'))
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(req.user.id, dto);
  }

  @Get()
  async findMine(@Request() req) {
    return this.paymentMethodService.findByUserId(req.user.id);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdatePaymentMethodDto
  ) {
    return this.paymentMethodService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    await this.paymentMethodService.delete(req.user.id, id);
    return { message: 'Payment method deleted' };
  }
}
