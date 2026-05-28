import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private repo: Repository<ProjectEntity>,
  ) {}

  create(dto: CreateProjectDto, ownerId: string) {
    const project = this.repo.create({
      ...dto,
      ownerId,
    });

    return this.repo.save(project);
  }

  findAll() {
    return this.repo.find({
      relations: {
        issues: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: {
        issues: true,
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return {
      deleted: true,
    };
  }
}
