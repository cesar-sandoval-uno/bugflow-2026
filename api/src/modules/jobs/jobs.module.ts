import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from '../issues/entities/issue.entity';
import { IssuePriorityJob } from './issue-priority.job';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity])],
  providers: [IssuePriorityJob],
})
export class JobsModule {}
