import { Module } from "@nestjs/common";
import { GroupController } from "../controllers/group.controller";
import { GroupsService } from "src/infrastructure/services/groups.service";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { groupsRepository } from "src/core/repositories/groups.repository";
import { RepositoryModule } from "./repository.module";



@Module({
    controllers:[GroupController],
    providers:[GroupsService],
    imports:[RepositoryModule],
    exports:[GroupsService]
})
export class groupModule{

}