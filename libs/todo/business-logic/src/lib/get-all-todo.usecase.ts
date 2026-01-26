import {
  IGetAllTodoUseCase,
  GetAllTodoRequest,
  ITodoRepository
} from '../../../business-protocol/src/index';
import { ITodo } from '@org/todo-domain-protocol';

export class GetAllTodoUseCase implements IGetAllTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(request: GetAllTodoRequest): Promise<ITodo[]> {
    return this.todoRepository.findAll(request.filters);
  }
}
