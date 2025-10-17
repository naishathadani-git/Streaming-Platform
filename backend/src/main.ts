import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // your Next.js frontend URL
    credentials: true, // if you plan to send cookies/auth headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
