import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThan, Not } from 'typeorm';
import { IssueEntity } from '../issues/entities/issue.entity';
import { IssuePriority, IssueStatus } from '@bugflow-2026/shared-types';

@Injectable()
export class IssuePriorityJob {
  private readonly logger = new Logger(IssuePriorityJob.name);

  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepo: Repository<IssueEntity>,
  ) {}

  @Cron('*/5 * * * *')
  async handleStaleIssues() {
    this.logger.log('⏱️ Checking stale issues every 5 minutes...');

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const staleIssues = await this.issueRepo.find({
      where: {
        status: IssueStatus.OPEN,
        priority: Not(IssuePriority.HIGH),
        assignee: IsNull(),
        createdAt: LessThan(twoDaysAgo),
      },
    });

    if (!staleIssues.length) {
      this.logger.log('👌 No stale issues found');
      return;
    }

    for (const issue of staleIssues) {
      issue.priority = IssuePriority.HIGH;
    }

    await this.issueRepo.save(staleIssues);

    this.logger.log(`✅ ${staleIssues.length} issues updated to HIGH priority`);
  }
}
