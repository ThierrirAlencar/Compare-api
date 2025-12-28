import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDTO {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        nullable:true,
        required:false,
    })
    @IsOptional()
    @IsString()
    name?: string;
}