import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { GeneralStatus } from "generated/prisma/enums";

export class UpdateUserDTO {
    @ApiProperty({
        required:false
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        required:false
    })
    @IsOptional()
    name?: string;

    @ApiProperty({
        enumName:"GeneralStatus",
        enum:GeneralStatus,
        required:false
    })
    @IsOptional()
    @IsEnum(GeneralStatus)
    status?: GeneralStatus
}