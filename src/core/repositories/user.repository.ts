import { Prisma, user } from "generated/prisma/client";

export abstract class UserRepository {
    abstract create(data: Prisma.userCreateInput): Promise<user>
    abstract findById(id: string): Promise<user | null>
    abstract update(id: string, data: Prisma.userUncheckedUpdateInput): Promise<user>
    abstract delete(id: string): Promise<void>
}