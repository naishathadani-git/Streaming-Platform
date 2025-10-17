import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingContent } from '../../entities/streaming-content.entity';
import { StreamingContentController } from '../../controllers/streaming-content/streaming-content.controller';
import { StreamingContentService } from '../../services/streaming-content/streaming-content.service';

//Register the entity with TypeORM and it injectible into service
@Module({
  imports: [TypeOrmModule.forFeature([StreamingContent])],
  controllers: [StreamingContentController],
  providers: [StreamingContentService],
})
export class StreamingContentModule {}
