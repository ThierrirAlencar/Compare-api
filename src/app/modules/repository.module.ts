import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";
import { ProductRepository } from "src/core/repositories/product.repository";
import { PrismaProductRepository } from "src/infrastructure/repositories/prisma-product.repository";
import { triggerRepository } from "src/core/repositories/trigger.repository";
import { triggerPrismaRepository } from "src/infrastructure/repositories/prisma-trigger.repository";
import { groupsRepository } from "src/core/repositories/groups.repository";
import { PrismaGroupsRepository } from "src/infrastructure/repositories/prisma-groups.repository";
import { permissionsRepository } from "src/core/repositories/permissions.repository";
import { PrismaPermissionsRepository } from "src/infrastructure/repositories/prisma-permissions.repository";
import { RegistryRepository } from "src/core/repositories/registry.repository";
import { PrismaRegistryRepository } from "src/infrastructure/repositories/prisma-registry.repository";

@Module({
    imports:[PrismaModule],
    providers:[
        { provide: UserRepository, useClass: PrismaUserRepository },
        { provide: ProductRepository, useClass: PrismaProductRepository },
        { provide: triggerRepository, useClass: triggerPrismaRepository },
        { provide: groupsRepository, useClass: PrismaGroupsRepository },
        { provide: permissionsRepository, useClass: PrismaPermissionsRepository },
        { provide: RegistryRepository, useClass: PrismaRegistryRepository }
    ],
    exports:[UserRepository,ProductRepository, triggerRepository, groupsRepository, permissionsRepository, RegistryRepository]
})
export class RepositoryModule {}