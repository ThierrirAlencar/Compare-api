import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        nullable:true,
        required:false,
    })
    name?: string;
}