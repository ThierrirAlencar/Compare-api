import { ApiParam, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { GeneralStatus } from "generated/prisma";

export class updateTriggerDTO{
    @ApiProperty({
        description:"preço objetivado",
        type:"number",
        nullable:true
    })
    targetPrice?: string;

    @ApiProperty({
        description:"Status do produto",
        enum:GeneralStatus,
        nullable:true
    })
    status?: GeneralStatus;
    
}

export class updateTriggerParams{
    @ApiProperty({
        name:"id",
        description:"o id do trigger a ser atualizado"
    })
    id:String
}