import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { user } from 'generated/prisma/client';
import { CreateUserDTO } from 'src/app/dtos/user/create-user.dto';
import { UserRepository } from 'src/core/repositories/user.repository';
import { conflictError, notFoundError } from '../utils/errors';
import { UpdateUserDTO } from 'src/app/dtos/user/update-user.dto';
import { mailService } from './mail.service';
import { welcomeType } from '../utils/templates/welcome';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository, private _mailService: mailService) {}

  async create(data: CreateUserDTO): Promise<user> {
    const { email, password, name } = data;

    const isEmailAlreadyInUse = await this._userRepository.findByEmail(email);
    if(isEmailAlreadyInUse){
      throw new conflictError("O Email já está em uso");
    }

    const hashPassword = await hash(password, 11);
  
    const user = await this._userRepository.create({
      email,
      password: hashPassword,
      name,
    });

    await this._mailService.sendWelcomeEmail(email, name, welcomeType.singup);

    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    const {email,name,status} = data;
    const doesUserExists = await this._userRepository.findById(id);
    if(!doesUserExists){
      throw new notFoundError("O Usuário não foi encontrado");
    }

    if(email){
      const isEmailAlreadyInUse = await this._userRepository.findByEmail(email)
      if(isEmailAlreadyInUse){
        throw new conflictError("O Email já está em uso");
      }
    }

    await this._userRepository.update(id, {
      email,
      name,
      status,
      updated_at:new Date()
    })
  }
}
