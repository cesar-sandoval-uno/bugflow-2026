import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { ForbiddenException } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { IssueEntity } from '../issues/entities/issue.entity';
import { User } from '../users/entities/user.entity';

describe('CommentsService', () => {
  let service: CommentsService;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockIssuesRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUsersRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(CommentEntity),
          useValue: mockRepo,
        }, {
          provide: getRepositoryToken(IssueEntity),
          useValue: mockIssuesRepo,
        }, {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not allow editing another user comment', async () => {
    mockRepo.findOne.mockResolvedValue({
      id: '1',
      authorId: 'owner-user',
      content: 'hello',
    });

    await expect(
      service.update(
        '1',
        { content: 'updated' },
        'different-user',
      ),
    ).rejects.toThrow(ForbiddenException);
  });
});
