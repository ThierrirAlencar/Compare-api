
import { Prisma } from "generated/prisma";
import { mapper_trigger_to_service } from "../mappers/triggers";


export abstract class triggerRepository {
    abstract create(data: Prisma.triggerUncheckedCreateInput): Promise<mapper_trigger_to_service>
    abstract findById(id: string): Promise<mapper_trigger_to_service | null>
    abstract findByUser(uid:string):Promise<mapper_trigger_to_service[]> //Not user
    abstract update(id: string, data: Prisma.triggerUncheckedUpdateInput): Promise<mapper_trigger_to_service> //Retorna parcialmente um trigger (sem id ou genérico)
    abstract delete(id: string): Promise<mapper_trigger_to_service>
}