import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the desired configuration
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true, // Allow cookies to be sent with the request
  };
  app.enableCors(corsOptions);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}

bootstrap();