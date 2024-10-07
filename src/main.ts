import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { writeFileSync } from 'fs';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  //Global prefix
  //Versioning API
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'],
  });

  //Config CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  //Pipe Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  //Cookie parser
  app.use(cookieParser());

  //Guard
  //Nếu có sử dụng reflector bên Guard thì phải truyền vào
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //Interceptor
  //Nếu có sử dụng reflector bên Interceptor thì phải truyền vào
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //Swagger OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //Convert to YAML and save to file
  const yaml = dump(document);
  writeFileSync('./fern/openapi/openapi.yml', yaml);

  SwaggerModule.setup('docs', app, document);

  await app.listen(8080);
}

bootstrap();
