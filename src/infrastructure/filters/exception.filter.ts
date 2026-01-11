import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { baseError } from '../utils/errors';
import { Response  } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { ZodError } from 'zod';
import { error } from 'console';

//Quando qualquer erro for disparado na aplicação
@Catch(Error)
export class exceptionFilter implements ExceptionFilter{
    catch(exception: Error, host: ArgumentsHost) {
        //Load HTTP BS
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        //send exceptions
        if(exception instanceof baseError){
            response
                .status(exception.http_status)
                .send(exception)
                
        }else if(exception instanceof PrismaClientKnownRequestError){
            response
                .status(500)
                .send({
                    http_status:500,
                    description:"Unfiltered prisma error",
                    error:{
                        name:exception.name,
                        message:exception.message
                        //does not send full information over concerns of sensitive leak
                    }
                })
        }else if(exception instanceof ZodError){
            response
                .status(400)
                .send({
                    http_status:400,
                    description:"zod validation error",
                    error:exception
                })
        }else {
            response
                .status(500)
                .send({
                    http_status:500,
                    description:"unknow or unpredicted error",
                    error:exception.message
                })
        }
    }
}