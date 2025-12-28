import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";
import { ProductRepository } from "src/core/repositories/product.repository";
import { PrismaProductRepository } from "src/infrastructure/repositories/prisma-product.repository";

@Module({
    imports:[PrismaModule],
    providers:[
        { provide: UserRepository, useClass: PrismaUserRepository },
        { provide: ProductRepository, useClass: PrismaProductRepository },
    ],
    exports:[UserRepository,ProductRepository]
})
export class RepositoryModule {}