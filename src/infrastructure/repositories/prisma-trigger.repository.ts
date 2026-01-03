import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { triggerRepository } from "src/core/repositories/trigger.repository";
import { trigger } from "generated/prisma/browser";
import { triggerUncheckedCreateInput, triggerUncheckedUpdateInput } from "generated/prisma/models";
import { mapper_trigger_to_service } from "src/core/mappers/triggers";



@Injectable()
export class triggerPrismaRepository implements triggerRepository{
    constructor(
        private __prisma:PrismaService
    ){}

    async findById(id: string): Promise<mapper_trigger_to_service | null> {
        return await this.__prisma.trigger.findUnique({
            where:{
                id
            },
            select:{
                userId:false
            }
        })
    }
    async findByUser(uid: string): Promise<mapper_trigger_to_service[]> {
        return await this.__prisma.trigger.findMany({
            where:{
                userId:uid
            },
            select:{
                userId:false
            }
        })
    }
    async update(id: string, data: triggerUncheckedUpdateInput): Promise<mapper_trigger_to_service> {
        const {created_at,deleted_at,status,targetPrice} = data
        return await this.__prisma.trigger.update({
            where:{
                id
            },
            data:{
                created_at,deleted_at,status,targetPrice,updated_at:new Date()
            },
            select:{
                userId:false
            }
        })
    }
    async delete(id: string): Promise<mapper_trigger_to_service> {
        return await this.__prisma.trigger.update({
            where:{
                id
            },
            data:{
                status:"DELETED",
                deleted_at:new Date()
            },
            select:{
                userId:false
            }
        })
    }

    async create(data: triggerUncheckedCreateInput): Promise<mapper_trigger_to_service> {
        const _trigger = await this.__prisma.trigger.create({
            data:data,
            select:{
                userId:false 
            }
        })
        return _trigger
    }
    
}