import { Injectable } from '@nestjs/common';
import { groupsRepository } from 'src/core/repositories/groups.repository';
import { Prisma, groups } from 'generated/prisma/browser';
import { notFoundError } from '../utils/errors';
import { UserRepository } from 'src/core/repositories/user.repository';
import { mapper_safe_user } from 'src/core/mappers/users';

@Injectable()
export class GroupsService {
  constructor(
    private readonly _groupsRepository: groupsRepository,
) {}

  async create(data: Prisma.groupsUncheckedCreateInput): Promise<groups> {
    return await this._groupsRepository.create(data);
  }

  async findById(id: string): Promise<groups> {
    const g = await this._groupsRepository.findById(id);
    if (!g) throw new notFoundError('O grupo informado não foi encontrado');
    return g;
  }

  async update(
    id: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<void> {
    const exists = await this._groupsRepository.findById(id);
    if (!exists)
      throw new notFoundError('O grupo informado não foi encontrado');
    await this._groupsRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const exists = await this._groupsRepository.findById(id);
    if (!exists)
      throw new notFoundError('O grupo informado não foi encontrado');
    await this._groupsRepository.delete(id);
  }

  async assignPermission(data: Prisma.group_permissionsUncheckedCreateInput) {
    return await this._groupsRepository.assign_group_permission(data);
  }

  async assignUser(data: Prisma.user_groupsUncheckedCreateInput) {
    return await this._groupsRepository.assign_group_user(data);
  }
}
