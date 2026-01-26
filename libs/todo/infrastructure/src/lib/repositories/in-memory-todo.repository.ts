import { ITodoRepository, TodoFilters } from '@org/business-protocol';
import { ITodo } from '@org/todo-domain-protocol';

export class InMemoryTodoRepository implements ITodoRepository {
  private readonly todos: Map<string, ITodo> = new Map();

  async save(todo: ITodo): Promise<ITodo> {
    this.todos.set(todo.id, todo);
    return todo;
  }

  async findById(id: string): Promise<ITodo | undefined> {
    return this.todos.get(id);
  }

  async findAll(filters?: TodoFilters): Promise<ITodo[]> {
    let all = Array.from(this.todos.values());

    if (filters) {
      if (filters.title) {
        all = all.filter(t => t.title.includes(filters.title!));
      }
      if (filters.isDone !== undefined) {
        all = all.filter(t => t.isDone === filters.isDone);
      }
      // Add more filters if needed
    }

    return all;
  }
}
