import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 10, // limit each IP to 10 requests per windowMs
    })
  );
  console.log(process.env.WHITELIST_POST)
  // Enable CORS
  app.enableCors({
    origin: process.env.WHITELIST_POST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
