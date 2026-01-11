import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { HTTP_CORS_CONFIG_PARAMS } from "src/config/constants";
import { _env } from "src/config/env";

@Injectable()
export class optionsService{
    constructor(){}

    async get_metadata(request:Request){
        const _baseplate_request = {
            Host:{
                host:request.host,
                name:request.hostname
            },
            Accepts:request.accepted,
            Cors:HTTP_CORS_CONFIG_PARAMS,
            Accepted_Language:request.acceptsLanguages(),
            Accepted_Encoding:request.acceptsEncodings(),
            Connection:request.connection, 
            environ:_env,
            //After Websocket Request Methods insert WS Relational Mapper here to events tracing
        }
    }

    //Futher Development of Real time Config changes 
    //(To be Done)
}