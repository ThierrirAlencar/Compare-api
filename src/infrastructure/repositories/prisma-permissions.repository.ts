import { permissionsRepository } from "src/core/repositories/permissions.repository";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { Prisma, permission } from "generated/prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaPermissionsRepository implements permissionsRepository {
    constructor(
        private readonly _prisma: PrismaService,
    ) {}

    async create(data: Prisma.permissionUncheckedCreateInput): Promise<permission> {
        return this._prisma.permission.create({
            data,
        })
    }

    async findById(id: number): Promise<permission | null> {
        return this._prisma.permission.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: Prisma.permissionUncheckedUpdateInput): Promise<void> {
        await this._prisma.permission.update({
            where: {
                id
            },
            data,
        })
    }

    async delete(id: number): Promise<void> {
        await this._prisma.permission.delete({
            where: {
                id,
            }
        })
    }
}
