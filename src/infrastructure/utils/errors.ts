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
            NODE_ENV=="DEPLOY","noone"
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

export class conflictError extends baseError {
    constructor(public message: string){
        super();
    }
    code = 2;
    http_status = 409;
    description = "dados conflitantes";
}

export class unauthorizedError extends baseError {
    constructor(public message: string){
        super();
    }
    code = 3;
    http_status = 401;
    description = "não autorizado, credenciais inválidas"
}

export class notFoundError extends baseError {
    constructor(public message: string){
        super();
    }
    code = 4;
    http_status = 404;
    description = "não encontrado, o servidor não foi capaz de encontrar o recurso requisitado"
}