import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the todo' })
  title!: string;

  @ApiProperty({ description: 'The description of the todo' })
  description!: string;

  @ApiPropertyOptional({ description: 'List of existing label IDs' })
  labelIds?: string[];

  @ApiPropertyOptional({ description: 'List of new label names to create on the fly' })
  labelNames?: string[];
}
