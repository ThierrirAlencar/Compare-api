import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/infrastructure/services/user.service';
import { user } from 'generated/prisma/client';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { ErrorResponseDTO } from '../dtos/error-reponse.dto';
import { UpdateUserDTO } from '../dtos/user/update-user.dto';
import { Request } from 'express';
import { AuthRequest } from 'src/core/types/auth-request';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InServiceUserDto } from '../dtos/user/in-service-user.dto';

@UseInterceptors(CacheInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: InServiceUserDto,
  })
  @ApiConflictResponse({
    description: 'The email received is already in use',
    type: ErrorResponseDTO,
  })
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this._userService.create(body);
    return user;
  }

  @Get('get')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Req() req: AuthRequest): Promise<InServiceUserDto> {
    const userId = String(req.user.id);
    const user = await this._userService.get(userId);
    return user;
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  @CacheKey('user_update')
  @CacheTTL(300)
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  @ApiConflictResponse({
    description: 'The email received is already in use',
  })
  async updateUser(@Req() req: AuthRequest, @Body() body: UpdateUserDTO) {
    const userId = String(req.user.id);
    await this._userService.update(userId, body);
    return {
      description: 'User updated successfully',
    };
  }
}
