import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResponseDTO {
    @ApiProperty()
    token: string;
}