import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";

@Module({
    imports:[PrismaModule],
    providers:[
        { provide: UserRepository, useClass: PrismaUserRepository }
    ],
    exports:[UserRepository]
})
export class RepositoryModule {}