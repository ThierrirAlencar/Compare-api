import { Module } from "@nestjs/common";
import { PermissionsService } from "src/infrastructure/services/permissions.service";
import { PermissionsController } from "../controllers/permissions.controller";
import { RepositoryModule } from "./repository.module";




@Module({
    controllers:[PermissionsController],
    providers:[PermissionsService],
    imports:[RepositoryModule]
})
export class permissionModule{

}