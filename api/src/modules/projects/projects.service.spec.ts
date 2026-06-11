import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entities/project.entity';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const mockRepo = {
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
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const dto = {
      name: 'BugFlow',
      description: 'Tracking bugs',
    };

    const project = {
      id: '1',
      ...dto,
      ownerId: 'auth0|123',
    };

    mockRepo.create.mockReturnValue(project);
    mockRepo.save.mockResolvedValue(project);

    const result = await service.create(dto as any, 'auth0|123');

    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result).toEqual(project);
  });

  it('should return all projects', async () => {
    const projects = [{ id: '1' }];

    mockRepo.find.mockResolvedValue(projects);

    const result = await service.findAll();

    expect(result).toEqual(projects);
  });
});
