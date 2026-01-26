import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditTodoDto {
  @ApiPropertyOptional({ description: 'New title' })
  title?: string;

  @ApiPropertyOptional({ description: 'New description' })
  description?: string;

  @ApiPropertyOptional({ description: 'Mark as done or undone' })
  isDone?: boolean;

  @ApiPropertyOptional({ description: 'Replace labels with these IDs' })
  labelIds?: string[];
}
