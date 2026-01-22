import { Module } from "@nestjs/common";
import { RegistryController } from "../controllers/registry.controller";
import { RegistryService } from "src/infrastructure/services/registry.service";
import { RepositoryModule } from "./repository.module";

@Module({
    controllers:[RegistryController],
    imports:[RepositoryModule],
    providers:[RegistryService]
})
export class RegistryModule {}