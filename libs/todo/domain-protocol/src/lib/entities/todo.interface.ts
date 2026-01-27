import { ILabel } from './label.interface';

/**
 * Représente une tâche dans le système.
 */
export interface ITodo {
  /**
   * Retourne l'identifiant unique de la tâche.
   */
  getId(): string;

  /**
   * Retourne le titre de la tâche.
   */
  getTitle(): string;

  /**
   * Retourne la description de la tâche.
   */
  getDescription(): string;

  /**
   * Retourne l'état d'accomplissement de la tâche.
   */
  getIsDone(): boolean;

  /**
   * Retourne les labels associés à la tâche.
   */
  getLabels(): ILabel[];

  /**
   * Retourne la date de création de la tâche.
   */
  getCreatedAt(): Date;

  /**
   * Retourne la date de dernière modification.
   */
  getUpdatedAt(): Date;

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
