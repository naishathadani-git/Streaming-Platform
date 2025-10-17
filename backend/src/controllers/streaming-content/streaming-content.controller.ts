import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { StreamingContentService } from '../../services/streaming-content/streaming-content.service';
import { StreamingContent } from '../../entities/streaming-content.entity';
import { CreateStreamingContentDto } from '../../dto/streaming-content.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';

@Controller('streaming-content')
export class StreamingContentController {
  constructor(private readonly service: StreamingContentService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateStreamingContentDto) {
    const formatted = {
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnail_url, // map snake_case
      videoUrl: data.video_url, // map snake_case
      year: data.year,
      genre: data.genre,
      rating: data.rating,
      duration: data.duration,
      cast: data.cast,
      watchProgress: data.watch_progress ?? 0, // default value
    };
    return this.service.create(formatted);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateStreamingContentDto,
  ) {
    const updated = await this.service.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
