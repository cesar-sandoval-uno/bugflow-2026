import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth0Service } from '../auth/auth0.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueEntity } from './entities/issue.entity';
import { ProjectEntity } from '../projects/entities/project.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueEntity)
    private repo: Repository<IssueEntity>,
    private auth0Service: Auth0Service,
    @InjectRepository(ProjectEntity)
    private projectsRepo: Repository<ProjectEntity>,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    if (createIssueDto.projectId) {
      const project = await this.projectsRepo.findOneBy({
        id: createIssueDto.projectId,
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }
    }

    const issue = this.repo.create(createIssueDto);
    return this.repo.save(issue);
  }

  async findAll(filters: {
    status?: string;
    priority?: string;
    search?: string;
    projectId?: string;
  }) {
    const { status, priority, search, projectId } = filters;
    const qb = this.repo
      .createQueryBuilder('issue')
      .leftJoinAndSelect('issue.project', 'project');

    if (status) {
      qb.andWhere('issue.status = :status', { status });
    }
    if (priority) {
      qb.andWhere('issue.priority = :priority', { priority });
    }
    if (search) {
      qb.andWhere(
        `(LOWER(issue.title) LIKE :search OR LOWER(COALESCE(issue.assignee, '')) LIKE :search)`,
        { search: `%${search.toLowerCase()}%` }
      );
    }
    if (projectId === 'none') {
      qb.andWhere('issue.projectId IS NULL');
    } else if (projectId) {
      qb.andWhere(
        'issue.projectId = :projectId',
        { projectId }
      );
    }

    qb.orderBy('issue.createdAt', 'DESC')
      .addOrderBy('issue.updatedAt', 'DESC');

    const issues = await qb.getMany();
    const users = await this.auth0Service.getCachedUsers();
    const usersMap = new Map(
      users.map(u => [u.auth0Id, u])
    );

    return issues.map(issue => ({
      ...issue,
      assignee: issue.assignee
        ? {
            id: issue.assignee,
            name: usersMap.get(issue.assignee)?.name ?? 'Unknown',
          }
        : null,
    }));
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    await this.repo.update(id, updateIssueDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
