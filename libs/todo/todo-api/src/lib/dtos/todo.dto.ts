import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO pour créer une todo.
 */
export class CreateTodoDto {
  @ApiProperty({ description: 'Title of the todo' })
  title: string;

  @ApiProperty({ description: 'Description of the todo' })
  description: string;

  @ApiProperty({ description: 'Array of label IDs', required: false })
  labelIds?: string[];

  @ApiProperty({ description: 'Array of label names', required: false })
  labelNames?: string[];
}

/**
 * DTO pour répondre avec une todo.
 */
export class TodoResponseDto {
  @ApiProperty({ description: 'Unique identifier of the todo' })
  id: string;

  @ApiProperty({ description: 'Title of the todo' })
  title: string;

  @ApiProperty({ description: 'Description of the todo' })
  description: string;

  @ApiProperty({ description: 'Completion status' })
  isDone: boolean;

  @ApiProperty({
    description: 'Associated labels',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
      },
    },
  })
  labels: Array<{ id: string; name: string; color: string }>;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: string;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: string;
}
