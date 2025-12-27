import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/prisma.service';
import { AuthRequest } from 'src/core/types/auth-request';
import z from 'zod';
import { groups, permission } from 'generated/prisma/client';
import { log } from 'node:console';
import { forbidenError } from '../utils/errors';

@Injectable()
export class permissionMidleware implements NestMiddleware {
    
    constructor(
        private prismaService: PrismaService
    ){
        log("this is a permission midleware being loaded...")
    }

    async use(req: AuthRequest, res: Response, next: NextFunction) {
        const {id} = z.object({
            id:z.string().uuid()
        }).parse(req.user)
        
        const current_uri = req.url; //used to validate if has the actual permission for this route;

        //recebe lista de grupos ativos de um usuário
        const _groups = await this.checkActiveGroups(id);
        const _permissions = await this.checkAtiveGroupsPermissions(_groups);

        const find = _permissions.filter(r => r && r.uri == current_uri);
        if(find){
            next()
        }else{
            throw new forbidenError()
        }
    }

    async checkActiveGroups(uid:string):Promise<groups[]>{
        const _group_list = await this.prismaService.user_groups.findMany({
            where:{
                user_id:uid,
            },
            select:{
                group_rel:true
            }
        })

        return _group_list
            .map(e => e.group_rel)
            .filter(g => g && g.status === 'ACTIVE');
    }

    async checkAtiveGroupsPermissions(_groups:groups[]):Promise<permission[]>{
        if(!_groups || _groups.length === 0) return [];

        const permsNested = await Promise.all(_groups.map(async g => {
            const relations = await this.prismaService.group_permissions.findMany({
                where: { group_id: g.id },
                select: { permission_rel: true }
            });
            return relations.map(r => r.permission_rel).filter(r => r && r.status=="ACTIVE") as permission[];
        }));

        const allPerms = permsNested.flat();
        const uniqueById = Array.from(new Map(allPerms.map(p => [p.id, p])).values());
        return uniqueById;
    }
}
