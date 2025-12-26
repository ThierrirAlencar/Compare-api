import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { user } from "generated/prisma/client";
import { CreateUserDTO } from "src/app/dtos/create-user.dto";
import { UserRepository } from "src/core/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private _userRepository: UserRepository,
    ){}

    async create(data: CreateUserDTO): Promise<user>{
        const {email,password,name} = data
        const hashPassword = await hash(password, 11);
        return this._userRepository.create({
            email,
            password: hashPassword,
            name,
        })
    }
}