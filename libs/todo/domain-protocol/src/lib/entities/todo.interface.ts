import { ILabel } from './label.interface';

/**
 * Représente une tâche dans le système.
 */
export interface ITodo {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  labels: ILabel[];
  createdAt: Date;
  updatedAt: Date;

  /**
   * Marque la tâche comme terminée.
   */
  markAsDone(): void;

  /**
   * Met à jour le titre de la tâche.
   * @param title Nouveau titre
   * @throws {InvalidTodoTitleError} Si le titre est vide
   */
  updateTitle(title: string): void;
}
