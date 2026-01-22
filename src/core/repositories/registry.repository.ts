import { Prisma, registry } from "generated/prisma/client";
import { SearchRegistryDTO } from "src/app/dtos/registry/search-registry.dto";

export abstract class RegistryRepository {
    abstract create(data: Prisma.registryCreateInput): Promise<registry>
    abstract findById(id: string): Promise<registry | null>
    abstract search(data: SearchRegistryDTO): Promise<registry[]>
    abstract delete(id: string): Promise<void>
}