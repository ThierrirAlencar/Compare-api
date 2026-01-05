import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { log } from "console";
import { retry } from "rxjs";
import { PASSWORD_RECOVERY_MAIL } from "src/templates/password_recovery";
import { th } from "zod/v4/locales";
import { PrismaService } from "../database/prisma.service";
import { Gen5digitsValidationCode } from "../utils/functions/genValidEmailCode";
import { EmailType, SendEmail } from "src/core/mailer";
import { forbidenError, FSMTPError, notFoundError } from "../utils/errors";
import { WELCOME_EMAIL, welcomeType } from "src/templates/welcome";



@Injectable()
export class mailService{
    constructor(private prisma:PrismaService){}

    async sendRecoveryEmail(userEmail:string){
        const randCode = Gen5digitsValidationCode()
        const email:EmailType = {
            subject:"no-reply email de recuperação de senha",
            html:PASSWORD_RECOVERY_MAIL(randCode),
            text:"Recuperação de Senha da Plataforma Compare",
            to:userEmail
        }
        try{
            //enviar o email
            await SendEmail(email)
            return `${userEmail}-${randCode}`
        }catch(err){
            throw new FSMTPError()
        }
    }

    //Não implementado
    // async updateUserPasswordBasedInPassword(refString:string,passedCode:string,newPassword:string){
    //     const [email,code] = splitStringAtDash(refString)
    //     const doesTheUserExists = await this.prisma.user.findUnique({
    //         where:{
    //             email
    //         }
    //     })
    //     if(!doesTheUserExists){
    //         throw new notFoundError("usuário não existente")
    //     }
    //     if(code != passedCode){
    //         throw new forbidenError()
    //     }
        
    //     const _password = await hash(newPassword,9)
    //     const response = await this.prisma.user.update({
    //         data:{
    //             password:_password
    //         },
    //         where:{
    //             id:doesTheUserExists.id
    //         }
    //     })

    //     return response
    // }

    async sendWelcomeEmail(userEmail:string,userName:string, wel_type:welcomeType=welcomeType.login){
        const email:EmailType = {
            subject:"Bem-vindo à Plataforma Morimitsu!",
            html:WELCOME_EMAIL(userName,wel_type),
            text:"Bem-vindo à Plataforma Morimitsu!",
            to:userEmail
        }

        try{
            //enviar o email
            await SendEmail(email)
            return `Welcome email sent to ${userName}`
        }catch(err){
            log(err)
            throw new FSMTPError()
        }

    }
}