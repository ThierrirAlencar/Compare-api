import { Module } from '@nestjs/common';
import { UserModule } from './app/modules/user.module';
import { PrismaModule } from './app/modules/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserRepository } from './core/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserService } from './infrastructure/services/user.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),PrismaModule,UserModule],
  providers:[PrismaService, UserService,]
})
export class AppModule {}
