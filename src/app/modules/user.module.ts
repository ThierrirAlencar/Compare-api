import { Module } from "@nestjs/common";
import { UserService } from "src/infrastructure/services/user.service";
import { UserController } from "../controllers/user.controller";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";
import { RepositoryModule } from "./repository.module";

@Module({
    imports:[RepositoryModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}