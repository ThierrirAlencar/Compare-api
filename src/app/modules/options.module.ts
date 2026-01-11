import { Module } from "@nestjs/common";
import { optionsService } from "src/infrastructure/services/options.service";
import { OptionsController } from "../controllers/options.controller";




@Module({
    controllers:[OptionsController],
    providers:[optionsService],
    exports:[optionsService]
})
export class optionsModule{

}