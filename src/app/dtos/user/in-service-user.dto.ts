import { ApiProperty } from "@nestjs/swagger";
import { GeneralStatus } from "generated/prisma";

export class InServiceUserDto {
        @ApiProperty({
            type:"string"
        })
        name: string;
    
        @ApiProperty({
            type:"string"
        })
        email: string;
    
        @ApiProperty({
            enum:GeneralStatus,
            enumName:"GeneralStatus"
        })
        status: GeneralStatus;
    
        @ApiProperty({
            type:"string",
            format:"date-time"
        })
        created_at: Date;
    
        @ApiProperty({
            type:"string",
            format:"date-time"
        })
        updated_at: Date | null;
    
        @ApiProperty({
            type:"string",
            format:"date-time"
        })
        deleted_at: Date | null;
}