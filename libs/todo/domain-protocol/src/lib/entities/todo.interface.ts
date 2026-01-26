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
   * Marque la tâche comme non terminée.
   */
  markAsUndone(): void;

  /**
   * Met à jour le titre de la tâche.
   * @param title Nouveau titre
   * @throws {InvalidTodoTitleError} Si le titre est vide
   */
  updateTitle(title: string): void;

  /**
   * Met à jour la description de la tâche.
   * @param description Nouvelle description
   */
  updateDescription(description: string): void;

  /**
   * Met à jour les labels de la tâche.
   * @param labels Nouveaux labels
   */
  updateLabels(labels: ILabel[]): void;
}
