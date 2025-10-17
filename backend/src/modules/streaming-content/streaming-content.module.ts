import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingContent } from 'src/entities/streaming-content.entity';
import { StreamingContentController } from 'src/controllers/streaming-content/streaming-content.controller';
import { StreamingContentService } from 'src/services/streaming-content/streaming-content.service';

//Register the entity with TypeORM and it injectible into service
@Module({
  imports: [TypeOrmModule.forFeature([StreamingContent])],
  controllers: [StreamingContentController],
  providers: [StreamingContentService],
})
export class StreamingContentModule {}
