import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('streaming_content')
export class StreamingContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'video_url', nullable: false })
  videoUrl: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ length: 100, nullable: true })
  genre: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'text', nullable: true })
  cast: string;

  @Column({ name: 'watch_progress', type: 'float', default: 0 })
  watchProgress: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
