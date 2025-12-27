import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserService } from "src/infrastructure/services/user.service";
import { user } from "generated/prisma/client";
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { CreateUserResponseDTO } from "../dtos/user/create-user-response.dto";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { ErrorResponseDTO } from "../dtos/error-reponse.dto";

@Controller("user")
export class UserController {
    constructor(
        private readonly _userService: UserService,
    ){}

    @Post("create")
    @ApiCreatedResponse({
        description:"The record has been successfully created",
        type: CreateUserResponseDTO,
    })
    @ApiConflictResponse({
        description:"The email received is already in use",
        type: ErrorResponseDTO,
    })
    async createUser(@Body() body: CreateUserDTO) {
        const user = await this._userService.create(body);
        return user;
    }
}