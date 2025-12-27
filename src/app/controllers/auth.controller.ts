import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/infrastructure/services/auth.service";
import { AuthLoginDTO } from "../dtos/user/auth-login.dto";
import { ApiCreatedResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly _authService: AuthService
  ){}

  @Post("login")
  @ApiCreatedResponse({
    description:"The user signed in successfully",
    type: Object,
  })
  async login(@Body() body: AuthLoginDTO): Promise<object> {
    const result = await this._authService.login(body);
    return {
      result,
    };
  }
}
