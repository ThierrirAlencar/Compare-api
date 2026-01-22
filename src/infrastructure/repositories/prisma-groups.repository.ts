import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { groupsRepository } from "src/core/repositories/groups.repository";
import { groups, Prisma } from "generated/prisma";


@Injectable()
export class PrismaGroupsRepository implements groupsRepository {
	constructor(
		private readonly _prisma: PrismaService
	){}

	async create(data: Prisma.groupsUncheckedCreateInput): Promise<groups> {
		return await this._prisma.groups.create({ data })
	}

	async findById(id: string): Promise<groups | null> {
		return await this._prisma.groups.findUnique({ where: { id } })
	}

	async update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<void> {
		await this._prisma.groups.update({ where: { id }, data: data as any })
	}

	async delete(id: string): Promise<void> {
		await this._prisma.groups.delete({ where: { id } })
	}

	async assign_group_permission(data: Prisma.group_permissionsUncheckedCreateInput) {
		return await this._prisma.group_permissions.create({ data })
	}

	async assign_group_user(data: Prisma.user_groupsUncheckedCreateInput) {
		return await this._prisma.user_groups.create({ data })
	}

}