import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
    })
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Compare-Api")
    .setDescription("Compare-Api documentation")
    .setVersion("0.0.1")
    .addTag("Compare")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
