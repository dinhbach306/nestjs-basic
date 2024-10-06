import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';

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

  //Guard
  //Nếu có sử dụng reflector bên Guard thì phải truyền vào
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //Interceptor
  //Nếu có sử dụng reflector bên Interceptor thì phải truyền vào
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  await app.listen(8080);
}

bootstrap();
