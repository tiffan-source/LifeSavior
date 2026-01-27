import { ITodoRepository, ITodo, TodoFilters } from '@org/todo-business-protocol';

/**
 * Implémentation en mémoire du repository de todos (pour prototypage/test).
 */
export class InMemoryTodoRepositoryImpl implements ITodoRepository {
  private todos: Map<string, ITodo> = new Map();

  async save(todo: ITodo): Promise<ITodo> {
    this.todos.set(todo.id, todo);
    return todo;
  }

  async findAll(filters?: TodoFilters): Promise<ITodo[]> {
    let result = Array.from(this.todos.values());

    if (filters?.title) {
      result = result.filter(t => t.title.includes(filters.title!));
    }

    if (filters?.isDone !== undefined) {
      result = result.filter(t => t.isDone === filters.isDone);
    }

    return result;
  }

  async findById(id: string): Promise<ITodo | undefined> {
    return this.todos.get(id);
  }

  async deleteById(id: string): Promise<void> {
    this.todos.delete(id);
  }
}
