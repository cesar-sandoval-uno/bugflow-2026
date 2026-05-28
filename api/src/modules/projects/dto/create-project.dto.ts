import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Nonstop project' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'A brief description of the project' })
  @IsString()
  @IsNotEmpty()
  description!: string;
}
