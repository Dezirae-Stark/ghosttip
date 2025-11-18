/**
 * GhostTip - TipProfile Controller
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
import { TipProfileService } from './tip-profile.service';
import { CreateTipProfileDto, UpdateTipProfileDto } from '@ghosttip/shared';

@Controller('tip-profiles')
export class TipProfileController {
  constructor(private tipProfileService: TipProfileService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req, @Body() dto: CreateTipProfileDto) {
    return this.tipProfileService.create(req.user.id, dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findMine(@Request() req) {
    return this.tipProfileService.findByUserId(req.user.id);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.tipProfileService.findBySlug(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateTipProfileDto
  ) {
    return this.tipProfileService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Request() req, @Param('id') id: string) {
    await this.tipProfileService.delete(req.user.id, id);
    return { message: 'Profile deleted' };
  }
}
