import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionsService } from 'src/infrastructure/services/permissions.service';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { permission } from 'generated/prisma/client';
import { ErrorResponseDTO } from '../dtos/error-reponse.dto';
import {
  createPermissionDTO,
  createPermissionSuccessDTO,
  updatePermissionDTO,
} from '../dtos/permissions/permission.dto';

@UseInterceptors(CacheInterceptor)
@ApiTags('Permissions')
@Controller('permission')
export class PermissionsController {
  constructor(private readonly _permissionsService: PermissionsService) {}

//   @Post('create')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiCreatedResponse({
//     description: 'Permission created successfully',
//     type: createPermissionSuccessDTO,
//   })
//   async create(@Body() body: createPermissionDTO) {
//     return await this._permissionsService.create({
//         module:""
//     });
//   }

  @CacheKey('permission_get')
  @CacheTTL(300)
  @Get('get/:id')
  @ApiOkResponse({
    description: 'Permission found',
    type: createPermissionSuccessDTO,
  })
  @ApiNotFoundResponse({
    description: 'Permission not found',
    type: ErrorResponseDTO,
  })
  async findById(@Param('id') id: string) {
    return await this._permissionsService.findById(Number(id));
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
      name:"Authorization",description:"O token JWT em formato Bearer"
    })
  @ApiOkResponse({
    description: 'Permission updated',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'Permission not found',
    type: ErrorResponseDTO,
  })
  async update(@Param('id') id: string, @Body() body: updatePermissionDTO) {
    await this._permissionsService.update(Number(id), body);
    return 'Success';
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name:"Authorization",description:"O token JWT em formato Bearer"
  })
  @ApiOkResponse({
    description: 'Permission deleted',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'Permission not found',
    type: ErrorResponseDTO,
  })
  async delete(@Param('id') id: string) {
    await this._permissionsService.delete(Number(id));
    return 'Success';
  }
}
