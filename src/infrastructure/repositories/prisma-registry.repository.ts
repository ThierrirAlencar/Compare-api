
import { RegistryRepository } from "src/core/repositories/registry.repository";
import { PrismaService } from "../database/prisma.service";
import { registryCreateInput } from "generated/prisma/models";
import { registry } from "generated/prisma/browser";
import { SearchRegistryDTO } from "src/app/dtos/registry/search-registry.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRegistryRepository implements RegistryRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async create(data: registryCreateInput): Promise<registry> {
        return await this.prismaService.registry.create({
            data,
        })
    }

    async findById(id: string): Promise<registry | null> {
        return await this.prismaService.registry.findUnique({
            where:{
                id,
            }
        })
    }

    async search(data: SearchRegistryDTO): Promise<registry[]> {
        const {afterDate,beforeDate,store,status,page,take} = data;
        const currentPage = page ?? 1;
        const currentTake = take ?? 10;
        const skip = (currentPage - 1) * currentTake;

        return this.prismaService.registry.findMany({
            where:{
                created_at:{
                    ...(afterDate && { gte:afterDate }),
                    ...(beforeDate && { lte:beforeDate })
                },
                store,
                status,
            },
            take: currentTake,
            skip,
        })
    }

    async delete(id: string): Promise<void> {
        await this.prismaService.registry.update({
            where:{
                id,
            },
            data:{
                status:"DELETED",
            }
        })
    }
}