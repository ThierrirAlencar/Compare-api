import { groups, Prisma } from "generated/prisma/browser";
import { permission } from "generated/prisma/client";

export abstract class permissionsRepository {
    abstract create(data: Prisma.permissionUncheckedCreateInput): Promise<permission>
    abstract findById(id: number): Promise<permission | null>
    abstract update(id: number, data: Prisma.permissionUncheckedUpdateInput): Promise<void>
    abstract delete(id: number): Promise<void>
}