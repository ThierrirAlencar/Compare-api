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

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
    PrismaModule,
    UserModule,
    AuthModule
  ],
  providers:[PrismaService],
})
export class AppModule {
  configure(consumer: any) {
    consumer.apply(loggerMiddleware).forRoutes('*');
    //consumer.apply(permissionMidleware).forRoutes() <- use only in protected routes
  }
}
