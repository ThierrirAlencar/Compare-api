import { Body, Controller, Param, Post } from "@nestjs/common";
import { AuthService } from "src/infrastructure/services/auth.service";
import { AuthLoginDTO } from "../dtos/auth/auth-login.dto";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponseDTO } from "../dtos/error-reponse.dto";
import { AuthLoginResponseDTO } from "../dtos/auth/auth-login-response.dto";
import { AuthValidateCodeDTO } from "../dtos/auth/auth-validate-code.dto";

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

  @Post("requestRecovery/:email")
  @ApiCreatedResponse({
    description:"The email was sent successfully",
  })
  @ApiNotFoundResponse({
    description:"The user was not found",
    type: ErrorResponseDTO,
  })
  async requestRecovery(@Param("email") email: string) {
    await this._authService.requestRecovery(email);
    return {
      description:"The email was sent successfully"
    }
  }

  @Post("validateCode")
  @ApiCreatedResponse({
    description:"Code's legit",
    type: AuthLoginDTO
  })
  async validateCode(@Body() body: AuthValidateCodeDTO) {
    const {code,email} = body;
    const token = await this._authService.validateCode(code, email);
    return {
      token,
    }
  }
}
