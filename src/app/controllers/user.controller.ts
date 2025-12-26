import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserService } from "src/infrastructure/services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { user } from "generated/prisma/client";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { CreateUserResponseDTO } from "src/app/dtos/create-user-response.dto";

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
    async createUser(@Body() body: CreateUserDTO): Promise<user> {
        const user = await this._userService.create(body);
        return user;
    }
}