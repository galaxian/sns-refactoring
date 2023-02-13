import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { ValidationPipe } from '@nestjs/common';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = serverConfig.port;
  await app.listen(port);
}
bootstrap();
