import { IEditTodoUseCase, EditTodoRequest, ITodoRepository, ILabelRepository } from '../../../business-protocol/src/index';
import { ITodo } from '@org/todo-domain-protocol';

export class EditTodoUseCase implements IEditTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly labelRepository: ILabelRepository
  ) {}

  async execute(request: EditTodoRequest): Promise<ITodo> {
    const todo = await this.todoRepository.findById(request.todoId);

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (request.title) {
      todo.updateTitle(request.title);
    }

    if (request.description) {
      todo.updateDescription(request.description);
    }

    if (request.isDone !== undefined) {
      if (request.isDone) {
        todo.markAsDone();
      } else {
        todo.markAsUndone();
      }
    }

    if (request.labelIds) {
      const labels = await this.labelRepository.findByIds(request.labelIds);
      if (labels.length !== request.labelIds.length) {
        throw new Error('Some labels not found');
      }
      todo.updateLabels(labels);
    }

    return this.todoRepository.save(todo);
  }
}
