import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { GeneralStatus } from "generated/prisma/enums";

export class UpdateUserDTO {
    @ApiProperty({
        required:false
    })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @ApiProperty({
        enumName:"GeneralStatus",
        enum:GeneralStatus,
        required:false
    })
    @IsOptional()
    @IsEnum(GeneralStatus)
    @IsNotEmpty()
    status?: GeneralStatus
}