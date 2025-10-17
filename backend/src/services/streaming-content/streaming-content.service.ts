import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StreamingContent } from 'src/entities/streaming-content.entity';
import { CreateStreamingContentDto } from 'src/dto/streaming-content.dto';

@Injectable()
export class StreamingContentService {
  constructor(
    @InjectRepository(StreamingContent)
    private streamingContentRepo: Repository<StreamingContent>,
  ) {}
  findAll() {
    return this.streamingContentRepo.find();
  }
  findOne(id: number) {
    return this.streamingContentRepo.findOne({ where: { id } });
  }

  create(data: Partial<StreamingContent>) {
    try {
      const newContent = this.streamingContentRepo.create(data);
      return this.streamingContentRepo.save(newContent);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create content.');
    }
  }

  async update(id: number, data: CreateStreamingContentDto) {
    if (!data) {
      throw new BadRequestException('No data provided to update');
    }
    const formatted = {
      ...data,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      watchProgress: data.watch_progress ?? 0,
    };
    //Load existing data
    const existing = await this.streamingContentRepo.findOne({ where: { id } });
    if (!existing) return null;

    //Update
    Object.assign(existing, formatted);
    return this.streamingContentRepo.save(existing);
  }

  remove(id: number) {
    return this.streamingContentRepo.delete(id);
  }
}
