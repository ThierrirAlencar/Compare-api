import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthRequest } from 'src/core/types/auth-request';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { triggerService } from 'src/infrastructure/services/trigger.service';
import z from 'zod';
import {
  createTriggerDTO,
  createTriggerSuccessDTO,
  updateTriggerDTO,
  updateTriggerParams,
} from '../dtos/triggers/index';

@UseInterceptors(CacheInterceptor)
@ApiTags('Trigger')
@Controller('/trigger')
export class triggerController {
  constructor(private _service: triggerService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    example: createTriggerSuccessDTO,
  })
  @Post('/')
  async create(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Body() body: createTriggerDTO,
  ) {
    const { prodId, targetPrice, status } = body;

    const { id: uid } = z
      .object({
        id: z.string().uuid(),
      })
      .parse(req.user);
    const _res = await this._service.create({
      prodId,
      targetPrice,
      userId: uid,
      status,
    });
    res.status(201).send({
      description: 'alerta criado com sucesso!',
      data: _res,
    });
  }

  @Patch('/update/:id')
  @ApiQuery({
    name: 'id',
    description: 'o id do alerta a ser atualizado!',
  })
  async update(
    @Res() res: Response,
    @Body() body: updateTriggerDTO,
    @Query() query: updateTriggerParams,
  ) {
    const { targetPrice, status } = body;

    const { id } = z
      .object({
        id: z.string().cuid(),
      })
      .parse(query);

    const _res = await this._service.update(id, {
      targetPrice,
      status,
    });

    res.status(200).send({
      description: 'Aviso de preços atualizado com sucesso!',
      data: _res,
    });
  }

  @Get('/all')
  @ApiResponse({
    status: 200,
    example: {
      description: 'lista de alertas retornadas com sucesso!',
      data:new Array<createTriggerSuccessDTO>,
    },
  })
  @CacheKey('trigger_all')
  @CacheTTL(300)
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Res() res: Response, @Req() req: AuthRequest) {
    const { id: uid } = z
      .object({
        id: z.string().uuid(),
      })
      .parse(req.user);

    const _res = (await this._service.findByUser(
      uid,
    )) as createTriggerSuccessDTO[];

    res.status(200).send({
      description: 'lista de alertas retornadas com sucesso!',
      data: _res,
    });
  }

  @Delete('/delete/:id')
  @ApiQuery({
    name: 'id',
    description: 'o id do alerta a ser deletado!',
  })
  async delete(
    @Res() res: Response,
    @Body() body: updateTriggerDTO,
    @Query() query: updateTriggerParams,
  ) {
    const { targetPrice, status } = body;

    const { id } = z
      .object({
        id: z.string().cuid(),
      })
      .parse(query);

    const _res = await this._service.delete(id);

    res.status(200).send({
      description: 'Aviso de preços deletado com sucesso!',
      data: _res,
    });
  }

  @Get('/getone/:id')
  @ApiQuery({
    name: 'id',
    description: 'o id do alerta a ser retornado!',
  })
  @CacheTTL(300)
  @ApiResponse({
    status: 200,
    example: createTriggerSuccessDTO,
  })
  async getone(
    @Res() res: Response,
    @Body() body: updateTriggerDTO,
    @Query() query: updateTriggerParams,
  ) {
    const { targetPrice, status } = body;

    const { id } = z
      .object({
        id: z.string().cuid(),
      })
      .parse(query);

    const _res = (await this._service.findById(id)) as createTriggerSuccessDTO;

    res.status(200).send({
      description: 'Aviso de preços retornado com sucesso!',
      data: _res,
    });
  }
}
