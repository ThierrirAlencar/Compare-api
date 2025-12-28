import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { Prisma, user } from "generated/prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(
        private readonly _prisma: PrismaService,
    ){}

    async create(data: Prisma.userCreateInput): Promise<user> {
        const user = this._prisma.user.create({
            data,
        })
        return user
    }

    async findById(id: string): Promise<user | null> {
        return this._prisma.user.findUnique({
            where:{
                id,
            }
        })
    }

    async findByEmail(email: string): Promise<user | null> {
        return this._prisma.user.findUnique({
            where:{
                email,
            }
        })
    }

    async update(id: string, data: Prisma.userUncheckedUpdateInput): Promise<user> {
        return this._prisma.user.update({
            where:{
                id
            },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        this._prisma.user.update({
            where:{
                id,
            },
            data:{
                status:"DELETED",
                deleted_at:new Date(),
            }
        })
    }
}