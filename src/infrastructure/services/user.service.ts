import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { user } from 'generated/prisma/client';
import { CreateUserDTO } from 'src/app/dtos/user/create-user.dto';
import { UserRepository } from 'src/core/repositories/user.repository';
import { conflictError } from '../utils/errors';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<user> {
    const { email, password, name } = data;

    const isEmailAlreadyInUse = await this._userRepository.findByEmail(email);
    if(isEmailAlreadyInUse){
      throw new conflictError("O Email já está em uso");
    }

    const hashPassword = await hash(password, 11);
    return this._userRepository.create({
      email,
      password: hashPassword,
      name,
    });
  }
}
