import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exceptionFilter } from './infrastructure/filters/exception.filter';
import { API_HOST, PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  //Enable error handling filter
  app.useGlobalFilters(new exceptionFilter()) 

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Compare-Api")
    .setDescription("Compare-Api documentation")
    .setVersion("0.1.1")
    .addTag("Compare")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentFactory)

  await app.listen(PORT, API_HOST);
}
bootstrap();

