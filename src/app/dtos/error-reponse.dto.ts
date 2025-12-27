import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDTO {
    error: string;
    status: number;
    timestamp?: string;
    message?: string;
}