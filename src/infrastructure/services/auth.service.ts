import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthLoginDTO } from 'src/app/dtos/auth/auth-login.dto';
import { UserRepository } from 'src/core/repositories/user.repository';
import { notFoundError, unauthorizedError } from '../utils/errors';
import { mailService } from './mail.service';
import { welcomeType } from '../utils/templates/welcome';
import { log } from 'console';
import { API_JWT_CONFIG } from 'src/config/env';
import { RedisService } from '../database/redis.service';



interface user{id:string}
@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private userRepository: UserRepository,
    private mailService: mailService,
    private redis: RedisService,
  ) {
    // console.log("jwtservice:", this.jwtservice);
  }

  async login(data: AuthLoginDTO): Promise<string> {
    const {email,password} = data;
    const doesUserExists = await this.userRepository.findByEmail(email);
    if(!doesUserExists){
      throw new notFoundError("O usuário não foi encontrado");
    }
    const isPasswordCorrect = await compare(password, doesUserExists.password);
    if(!isPasswordCorrect){
      throw new unauthorizedError("Senha incorreta");
    }

    await this.mailService.sendWelcomeEmail(email, doesUserExists.name, welcomeType.login);
    
    return this.generateToken({
      id: doesUserExists.id,
    });

  }

  async generateToken({id}:user): Promise<string> {
    const payload = { sub:id};
    // console.log(payload)
    return this.jwtservice.sign(payload,{
      secret:API_JWT_CONFIG,
      expiresIn:"7d"
    });
  }

  async requestRecovery(email: string): Promise<void> {
    const doesUserExists = await this.userRepository.findByEmail(email);
    if(!doesUserExists){
      throw new notFoundError("O usuário não foi encontrado");
    }
    const result = await this.mailService.sendRecoveryEmail(email);
    const code = result.split("-");

    this.redis.set(doesUserExists.id, code[1], 60 * 15);
  }

  async validateCode(code: string, email: string): Promise<string> {
    const doesUserExists = await this.userRepository.findByEmail(email);
    if(!doesUserExists){
      throw new notFoundError("O usuário não foi encontrado");
    }

    const doesCodeExists = await this.redis.get(doesUserExists.id);
    if(!doesCodeExists){
      throw new unauthorizedError("Usuário não solicitou recuperação de conta");
    }
  
    if(doesCodeExists !== code){
      throw new unauthorizedError("Codigo inválido");
    }
  
    return this.generateToken({
      id: doesUserExists.id,
    });
  }

  // async validateUser(payload: any): Promise<user> {
  //   // Aqui você pode implementar a lógica de validação do usuário
  //   return { id: payload.sub};
  // }
}