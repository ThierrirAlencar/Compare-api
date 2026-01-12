import { Controller, Options, Req, Res, UseGuards } from "@nestjs/common";
import { GuardsConsumer } from "@nestjs/core/guards";
import { AuthGuard } from "@nestjs/passport";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthRequest } from "src/core/types/auth-request";
import { optionsService } from "src/infrastructure/services/options.service";



@ApiTags("Options")
@Controller("/options")
export class OptionsController{
    constructor(
        private _service:optionsService
    ){

    }

    @Options("/metadata")
    @ApiHeader({
        name:"Authorization",description:"O token JWT em formato Bearer"
    })
    @UseGuards(AuthGuard("jwt"))
    async get_metadata(@Req() req:Request, @Res() res:Response){
        const _data = await this._service.get_metadata(req);

        res.status(200).send({
            description:"Successfully Fetched Metadata Content"
        })
    }

    //Latter scrap configurations from outside effects
}