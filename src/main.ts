import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFilter } from './infrastructure/filters/exception.filter';
import { API_HOST, NODE_ENV, PORT } from './config/env';
import { HTTP_CORS_CONFIG_PARAMS } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(HTTP_CORS_CONFIG_PARAMS);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      transformOptions:{
        enableImplicitConversion:true,
      }
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
    .setTermsOfService("https://app.termly.io/dashboard/website/0147808a-a67a-4ef7-8205-766960554b6a/terms-of-service")
    .addTag("User","User related Routes")
    .addTag("Auth","User authentication related Routes")
    .addTag("Product","Product related Routes")
    .addTag("Groups","Group related routes")
    .addTag("Permissions","permissions related routes")
    .addTag("Trigger","routes related to user product triggers")
    .addTag("Options","API and HOST config Routes")
    .addTag("Webhooks","Not implemented")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, documentFactory)

  await app.listen(PORT, API_HOST).then(()=>{
    console.log(`[${new Date()}] - Compare-Api -> Mode: ${NODE_ENV} \n[${new Date()}] - Successfully running at: http://${API_HOST}:${PORT} `)
  });
}
bootstrap();

