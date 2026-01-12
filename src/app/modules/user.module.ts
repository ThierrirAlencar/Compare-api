import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserService } from "src/infrastructure/services/user.service";
import { UserController } from "../controllers/user.controller";
import { PrismaModule } from "./prisma.module";
import { UserRepository } from "src/core/repositories/user.repository";
import { PrismaUserRepository } from "src/infrastructure/repositories/prisma-user.repository";
import { RepositoryModule } from "./repository.module";
import { permissionMidleware } from "src/infrastructure/middleware/permissions-middleware";
import { mailService } from "src/infrastructure/services/mail.service";

@Module({
    imports:[RepositoryModule],
    controllers:[UserController],
    providers:[UserService,mailService],
    exports:[UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(permissionMidleware).forRoutes()
    }
}