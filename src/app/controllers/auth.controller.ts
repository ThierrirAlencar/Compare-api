import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/infrastructure/services/auth.service";
import { AuthLoginDTO } from "../dtos/auth/auth-login.dto";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponseDTO } from "../dtos/error-reponse.dto";
import { AuthLoginResponseDTO } from "../dtos/auth/auth-login-response.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly _authService: AuthService
  ){}

  @Post("login")
  @ApiCreatedResponse({
    description:"The user signed in successfully",
    type: AuthLoginResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description:"The password is incorrect",
    type: ErrorResponseDTO,
  })
  @ApiNotFoundResponse({
    description:"The user was not found",
    type: ErrorResponseDTO,
  })
  async login(@Body() body: AuthLoginDTO): Promise<object> {
    const token = await this._authService.login(body);
    return {
      token,
    };
  }
}
