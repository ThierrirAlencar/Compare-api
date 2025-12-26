import { Module } from "@nestjs/common";
import { UserService } from "src/infrastructure/services/user.service";
import { UserController } from "../controllers/user.controller";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers:[UserService, { provide: UserRepository, useClass: PrismaUserRepository }],
    exports:[UserService, UserRepository]
})
export class UserModule {}