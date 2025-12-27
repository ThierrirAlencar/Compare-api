

export class baseError extends Error{
    code:number
    http_status:number
    description:string

    //optional params
    public custom_params?:any
    constructor(){
        super()
        return this.custom_params;
    }
}

export class forbidenError extends baseError{
    code = 1;
    http_status = 403;
    description = "permissão inválida ou insuficiente para acessar essa rota!";
}