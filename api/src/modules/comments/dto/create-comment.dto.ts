import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'I can reproduce this bug on Firefox' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
