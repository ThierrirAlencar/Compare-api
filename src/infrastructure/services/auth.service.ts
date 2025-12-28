import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthLoginDTO } from 'src/app/dtos/auth/auth-login.dto';
import { UserRepository } from 'src/core/repositories/user.repository';
import { notFoundError, unauthorizedError } from '../utils/errors';


interface user{id:string}
@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private userRepository: UserRepository
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
    return this.generateToken({
      id: doesUserExists.id,
    });
  }

  async generateToken({id}:user): Promise<string> {
    const payload = { sub:id};
    // console.log(payload)
    return this.jwtservice.sign(payload,{
      secret:process.env.JWT_SECRET,
      expiresIn:"7d"
    });
  }

  // async validateUser(payload: any): Promise<user> {
  //   // Aqui você pode implementar a lógica de validação do usuário
  //   return { id: payload.sub};
  // }
}