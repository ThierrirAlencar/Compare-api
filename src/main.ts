import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFilter } from './infrastructure/filters/exception.filter';
import { API_HOST, NODE_ENV, PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
    })
  )
  //Enable error handling filter
  app.useGlobalFilters(new exceptionFilter()) 

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Compare-Api")
    .setDescription("Compare-Api documentation")
    .setVersion("0.1.2")
    .addBearerAuth({
      type:'oauth2',
      bearerFormat:"jwt",
      description:"JWT Token used in validation",
      name:"Authentication",
      scheme:"string"
    })
    .setLicense("license","Work in progress")//update later
    .setTermsOfService("Work In progress")//update later
    .addTag("User","User related Routes")
    .addTag("Auth","User authentication related Routes")
    .addTag("Product","Product related Routes")
    .addTag("Groups","Group related routes")
    .addTag("Permissions","permissions related routes")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentFactory)

  await app.listen(PORT, API_HOST).then(()=>{
    console.log(`[${new Date()}] - Compare-Api -> Mode: ${NODE_ENV} \n[${new Date()}] - Successfully running at: http://${API_HOST}:${PORT} `)
  });
}
bootstrap();

