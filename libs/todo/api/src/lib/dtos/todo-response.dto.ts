import { ApiProperty } from '@nestjs/swagger';
import { ITodo, ILabel } from '@org/todo-domain-protocol';

export class LabelResponseDto implements ILabel {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  color!: string;

  updateName(name: string): void { throw new Error('Method not implemented.'); }
  updateColor(color: string): void { throw new Error('Method not implemented.'); }
}

export class TodoResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  isDone!: boolean;

  @ApiProperty({ type: [LabelResponseDto] })
  labels!: LabelResponseDto[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromEntity(todo: ITodo): TodoResponseDto {
    const dto = new TodoResponseDto();
    dto.id = todo.id;
    dto.title = todo.title;
    dto.description = todo.description;
    dto.isDone = todo.isDone;
    dto.createdAt = todo.createdAt;
    dto.updatedAt = todo.updatedAt;
    dto.labels = todo.labels.map(l => ({ id: l.id, name: l.name, color: l.color } as LabelResponseDto));
    return dto;
  }
}
