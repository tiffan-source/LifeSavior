import {
  IGetAllTodoUseCase,
  GetAllTodoRequest,
  ITodoRepository
} from '@org/business-protocol';
import { ITodo } from '@org/todo-domain-protocol';

export class GetAllTodoUseCase implements IGetAllTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(request: GetAllTodoRequest): Promise<ITodo[]> {
    return this.todoRepository.findAll(request.filters);
  }
}
