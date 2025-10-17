import { Test, TestingModule } from '@nestjs/testing';
import { StreamingContentService } from '../streaming-content/streaming-content.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StreamingContent } from '../../entities/streaming-content.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('StreamingContentService', () => {
  let service: StreamingContentService;
  let repo: Repository<StreamingContent>;

  const mockContent = { id: 1, title: 'Test Video', videoUrl: 'video.mp4' };

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockContent]),
    findOne: jest.fn().mockResolvedValue(mockContent),
    create: jest.fn().mockReturnValue(mockContent),
    save: jest.fn().mockResolvedValue(mockContent),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamingContentService,
        {
          provide: getRepositoryToken(StreamingContent),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<StreamingContentService>(StreamingContentService);
    repo = module.get<Repository<StreamingContent>>(
      getRepositoryToken(StreamingContent),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of content', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockContent]);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and save new content', async () => {
      const result = await service.create(mockContent);
      expect(repo.create).toHaveBeenCalledWith(mockContent);
      expect(repo.save).toHaveBeenCalledWith(mockContent);
      expect(result).toEqual(mockContent);
    });

    it('should throw InternalServerErrorException on error', async () => {
      repo.save = jest.fn().mockRejectedValue(new Error('DB Error'));
      await expect(service.create(mockContent)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing content item', async () => {
      const data = {
        title: 'Updated',
        video_url: 'new.mp4',
        thumbnail_url: 'img.jpg',
      };
      const result = await service.update(1, data);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual(mockContent);
    });

    it('should return null if content not found', async () => {
      repo.findOne = jest.fn().mockResolvedValue(null);
      const result = await service.update(99, { title: 'none' });
      expect(result).toBeNull();
    });

    it('should throw BadRequestException if no data provided', async () => {
      await expect(service.update(1, null)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a content item', async () => {
      const result = await service.remove(1);
      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
