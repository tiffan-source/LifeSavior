import { ITodo } from '../entities/todo.interface';
import { ILabel } from '../entities/label.interface';

/**
 * Interface pour la création de tâches.
 */
export interface ITodoFactory {
  /**
   * Crée une nouvelle instance de Todo.
   * @param title Titre de la tâche
   * @param description Description de la tâche
   * @param labels Liste optionnelle de labels
   * @throws {InvalidTodoTitleError} Si le titre est vide
   */
  create(title: string, description: string, labels?: ILabel[]): ITodo;
}
