import { groups, Prisma } from "generated/prisma/browser";
import { permission } from "generated/prisma/client";

export abstract class groupsRepository {
    abstract create(data: Prisma.groupsUncheckedCreateInput): Promise<groups>
    abstract findById(id: string): Promise<groups | null>
    abstract update(id: string, data: Prisma.groupsUncheckedUpdateInput): Promise<void>
    abstract delete(id: string): Promise<void>

    //relatioship care
    abstract assign_group_permission(data:Prisma.group_permissionsUncheckedCreateInput)
    abstract assign_group_user(data:Prisma.user_groupsUncheckedCreateInput)
}