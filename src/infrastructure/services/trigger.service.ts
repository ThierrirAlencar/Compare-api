import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/browser";
import { mapper_trigger_to_service } from "src/core/mappers/triggers";
import { triggerRepository } from "src/core/repositories/trigger.repository";
import { notFoundError } from "../utils/errors";
import { createTriggerSuccessDTO } from "src/app/dtos/triggers/createTriggerDTO";




@Injectable()
export class triggerService{
    constructor(
        private __triggerRepository: triggerRepository
    ){

    }

    async create(data:Prisma.triggerUncheckedCreateInput):Promise<createTriggerSuccessDTO>{
        const {created_at,deleted_at,id,prodId,status,targetPrice,updated_at} = await this.__triggerRepository.create(data)
        return {
            id,prodId,status,targetPrice,created_at,deleted_at,updated_at
        }
    }

    async findById(id:string):Promise<mapper_trigger_to_service | null>{
        return await this.__triggerRepository.findById(id)
    }

    async findByUser(uid:string):Promise<mapper_trigger_to_service[]>{
        return await this.__triggerRepository.findByUser(uid)
    }

    async delete(id:string):Promise<mapper_trigger_to_service>{
        const doesTheTriggerExists = await this.__triggerRepository.findById(id);
        if(!doesTheTriggerExists){
            throw new notFoundError("Trigger does not exists")
        }
        return await this.__triggerRepository.delete(id)
    }

    async update(id:string, data:Prisma.triggerUncheckedUpdateInput):Promise<mapper_trigger_to_service>{
        const doesTheTriggerExists = await this.__triggerRepository.findById(id);
        if(!doesTheTriggerExists){
            throw new notFoundError("Trigger does not exists")
        }
        return await this.__triggerRepository.update(id, data)
    }
}