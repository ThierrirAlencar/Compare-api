import { Module } from '@nestjs/common';
import { UserModule } from './app/modules/user.module';
import { PrismaModule } from './app/modules/prisma.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserService } from './infrastructure/services/user.service';
import { loggerMiddleware } from './infrastructure/middleware/logger-middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/modules/auth.module';
import { permissionMidleware } from './infrastructure/middleware/permissions-middleware';
import { exceptionFilter } from './infrastructure/filters/exception.filter';
import { ProductModule } from './app/modules/product.module';
import { triggerModule } from './app/modules/trigger.module';
import { mailService } from './infrastructure/services/mail.service';
import { groupModule } from './app/modules/group.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { REDIS_HOST, REDIS_PORT } from './config/env';
import { optionsModule } from './app/modules/options.module';
import { permissionModule } from './app/modules/permissions.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }
    ),
    CacheModule.registerAsync({
      isGlobal:true,
      useFactory:()=>({
        store:redisStore,
        host:REDIS_HOST,
        port:REDIS_PORT,
        ttl:60
      })
    }) //Register Redis Based Caching
    ,
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    triggerModule,
    groupModule,
    optionsModule, //Secure this with the will of god
    permissionModule,
    PrismaModule
  ],
  providers:[mailService],
})
export class AppModule {
  configure(consumer: any) {
    consumer.apply(loggerMiddleware).forRoutes('*');
    //consumer.apply(permissionMidleware).forRoutes() <- use only in protected routes
  }
}
