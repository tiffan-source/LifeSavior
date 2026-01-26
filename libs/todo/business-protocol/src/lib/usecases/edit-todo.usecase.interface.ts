import { ITodo } from '@org/todo-domain-protocol';

export interface EditTodoRequest {
  todoId: string;
  title?: string;
  description?: string;
  isDone?: boolean;
  labelIds?: string[];
}

export interface IEditTodoUseCase {
  execute(request: EditTodoRequest): Promise<ITodo>;
}
