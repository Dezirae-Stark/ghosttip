/**
 * GhostTip - TipToken Controller
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TipTokenService } from './tip-token.service';

@Controller('tip-tokens')
export class TipTokenController {
  constructor(private tipTokenService: TipTokenService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Request() req,
    @Body() body: { tipProfileId: string; label?: string }
  ) {
    return this.tipTokenService.create(req.user.id, body.tipProfileId, body.label);
  }

  @Get('profile/:profileId')
  @UseGuards(AuthGuard('jwt'))
  async findByProfile(@Request() req, @Param('profileId') profileId: string) {
    return this.tipTokenService.findByProfileId(req.user.id, profileId);
  }

  @Put(':id/revoke')
  @UseGuards(AuthGuard('jwt'))
  async revoke(@Request() req, @Param('id') id: string) {
    return this.tipTokenService.revoke(req.user.id, id);
  }

  @Get('resolve/:token')
  async resolve(@Param('token') token: string) {
    return this.tipTokenService.resolveToken(token);
  }
}
