import { Module } from "@nestjs/common";
import { triggerController } from "../controllers/trigger.controller";
import { triggerService } from "src/infrastructure/services/trigger.service";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { RepositoryModule } from "./repository.module";

@Module({
    controllers:[triggerController],
    exports:[triggerService],
    imports:[RepositoryModule],
    providers:[triggerService]
})
export class triggerModule{}