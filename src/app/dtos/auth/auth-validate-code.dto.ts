import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthValidateCodeDTO {
    @ApiProperty({
        required:true,
        description:"The six digit code"
    })
    @IsNotEmpty()
    code: string;

    @ApiProperty({
        required:true,
        description:"User's email"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}