import { NODE_ENV } from "src/config/env"
import { Logger } from "./logger"


export class baseError extends Error{
    code:number
    http_status:number
    description:string

    //optional params
    public custom_params?:any

    //Pattern to be followed on erro classes
    constructor(){
        const l = new Logger(
            NODE_ENV=="DEPLOY"?true:false,"noone"
        )
        super()
        l.error(this.description, this)
    }
}

export class forbidenError extends baseError{
    code = 1;
    http_status = 403;
    description = "permissão inválida ou insuficiente para acessar essa rota!";
}