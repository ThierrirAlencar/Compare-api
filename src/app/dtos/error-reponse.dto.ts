import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDTO {
    @ApiProperty()
    code: number;

    @ApiProperty()
    http_status: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    message?: string;
}