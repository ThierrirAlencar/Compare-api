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

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    triggerModule,
    groupModule
  ],
  providers:[PrismaService,mailService],
})
export class AppModule {
  configure(consumer: any) {
    consumer.apply(loggerMiddleware).forRoutes('*');
    //consumer.apply(permissionMidleware).forRoutes() <- use only in protected routes
  }
}
