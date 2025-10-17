import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateStreamingContentDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail_url?: string; // snake_case from JSON

  @IsString()
  video_url: string; // required

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  cast?: string;

  @IsNumber()
  @IsOptional()
  watch_progress?: number;
}
