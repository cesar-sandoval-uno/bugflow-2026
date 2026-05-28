import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueEntity } from '../../issues/entities/issue.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @Column()
  authorId!: string;

  @Column()
  issueId!: string;

  @ManyToOne(
    () => IssueEntity,
    issue => issue.comments,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'issueId' })
  issue!: IssueEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
