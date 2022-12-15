import Proxy from '@fastify/http-proxy';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

export async function bootstrap() {
  const adapter = new FastifyAdapter();
  const fastify = adapter.getInstance();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  // Comment this to run app
  app.register(Proxy, {
    upstream: 'http://my-api.example.com',
    prefix: '/api', // optional
    http2: false, // optional
  });

  app.listen(3000, (error, address) => {
    if (error) {
      console.log('App Listen Error: ', error);
      process.exit(1);
    }
    Logger.verbose(address, 'API-Gateway Started');
  });
}

bootstrap();
