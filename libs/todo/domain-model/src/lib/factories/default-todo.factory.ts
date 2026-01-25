import { ITodo, ITodoFactory, InvalidTodoTitleError } from '@org/todo-domain-protocol';
import { DefaultTodo } from '../entities/default-todo.entity';

/**
 * Factory pour créer des instances de DefaultTodo.
 */
export class DefaultTodoFactory implements ITodoFactory {
  /**
   * Crée une nouvelle instance de Todo.
   * @param title Titre de la tâche
   * @param description Description de la tâche
   * @throws {InvalidTodoTitleError} Si le titre est vide
   */
  create(title: string, description: string): ITodo {
    if (!title || title.trim() === '') {
      throw new InvalidTodoTitleError();
    }

    // Simple ID generation
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const now = new Date();

    return new DefaultTodo(
      id,
      title,
      description,
      false,
      now,
      now
    );
  }
}
