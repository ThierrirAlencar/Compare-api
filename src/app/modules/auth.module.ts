import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { API_JWT_CONFIG } from 'src/config/env';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { AuthService } from 'src/infrastructure/services/auth.service';
import { JwtStrategy } from 'src/infrastructure/validators/jwt.strategy';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
              secret: API_JWT_CONFIG,
              signOptions: { expiresIn: '30d' },
        }),
    ],
    providers:[AuthService,JwtService,JwtStrategy,PrismaService],
    exports:[AuthService],
    controllers: []
})
export class AuthModule {}