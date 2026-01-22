import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GroupsService } from 'src/infrastructure/services/groups.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ErrorResponseDTO } from '../dtos/error-reponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { groups, Prisma } from 'generated/prisma';

@UseInterceptors(CacheInterceptor)
@ApiTags('Groups')
@Controller('group')
export class GroupController {
  constructor(private readonly _groupsService: GroupsService) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'Group created', type: Object })
  async create(
    @Body() body: Prisma.groupsUncheckedCreateInput,
  ): Promise<groups> {
    return await this._groupsService.create(body);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Group updated', type: String })
  @ApiNotFoundResponse({
    description: 'Group not found',
    type: ErrorResponseDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() body: Prisma.ProductUncheckedUpdateInput,
  ) {
    await this._groupsService.update(id, body);
    return 'Success';
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Group deleted', type: String })
  @ApiNotFoundResponse({
    description: 'Group not found',
    type: ErrorResponseDTO,
  })
  async delete(@Param('id') id: string) {
    await this._groupsService.delete(id);
    return 'Success';
  }

  @Post('assign/permission')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Permission assigned to group' })
  async assignPermission(
    @Body() body: Prisma.group_permissionsUncheckedCreateInput,
  ) {
    return await this._groupsService.assignPermission(body);
  }

  @Post('assign/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'User assigned to group' })
  async assignUser(@Body() body: Prisma.user_groupsUncheckedCreateInput) {
    return await this._groupsService.assignUser(body);
  }
}
