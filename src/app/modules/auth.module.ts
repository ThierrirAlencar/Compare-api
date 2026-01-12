import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { API_JWT_CONFIG, API_JWT_TIME } from 'src/config/env';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { AuthService } from 'src/infrastructure/services/auth.service';
import { JwtStrategy } from 'src/infrastructure/validators/jwt.strategy';
import { RepositoryModule } from './repository.module';
import { AuthController } from '../controllers/auth.controller';
import {StringValue} from "ms"
import { mailService } from 'src/infrastructure/services/mail.service';
import { RedisModule } from './redis.module';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
              secret: API_JWT_CONFIG,
              signOptions: { expiresIn: API_JWT_TIME as StringValue },
        }),
        RepositoryModule,
        RedisModule
    ],
    providers:[AuthService,JwtService,JwtStrategy,mailService],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}