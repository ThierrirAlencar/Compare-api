import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { notFoundError } from "../utils/errors";
import { permissionsRepository } from "src/core/repositories/permissions.repository";

@Injectable()
export class PermissionsService {
    constructor(
        private readonly _permissionsRepository: permissionsRepository
    ) {}

    async create(data: Prisma.permissionUncheckedCreateInput) {
        return await this._permissionsRepository.create(data);
    }

    async findById(id: number) {
        const permission = await this._permissionsRepository.findById(id);
        if (!permission) {
            throw new notFoundError("A permissão informada não foi encontrada");
        }
        return permission;
    }

    async update(id: number, data: Prisma.permissionUncheckedUpdateInput) {
        const doesPermissionExists = await this._permissionsRepository.findById(id);
        if (!doesPermissionExists) {
            throw new notFoundError("A permissão informada não foi encontrada");
        }
        await this._permissionsRepository.update(id, data);
    }

    async delete(id: number) {
        const doesPermissionExists = await this._permissionsRepository.findById(id);
        if (!doesPermissionExists) {
            throw new notFoundError("A permissão informada não foi encontrada");
        }
        await this._permissionsRepository.delete(id);
    }
}
