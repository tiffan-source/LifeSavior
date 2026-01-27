import { ITodoFactory, ITodo, ILabel } from '@org/todo-domain-protocol';
import { DefaultTodo } from '@org/todo-domain-model';

/**
 * Factory pour créer des todos (implémentation en mémoire).
 */
export class TodoFactoryImpl implements ITodoFactory {
  create(title: string, description: string, labels: ILabel[]): ITodo {
    return new DefaultTodo(
      this.generateId(),
      title,
      description,
      false,
      new Date(),
      new Date(),
      labels
    );
  }

  private generateId(): string {
    return `todo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
