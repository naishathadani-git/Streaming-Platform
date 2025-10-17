import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingContentModule } from './modules/streaming-content/streaming-content.module';
import { StreamingContent } from './entities/streaming-content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'streaming_db',
      entities: [StreamingContent],
      synchronize: true,
    }),
    StreamingContentModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
