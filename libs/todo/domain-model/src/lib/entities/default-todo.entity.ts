import { ITodo, InvalidTodoTitleError, ILabel } from '@org/todo-domain-protocol';

/**
 * Implémentation par défaut de l'entité Todo.
 */
export class DefaultTodo implements ITodo {
  private readonly id: string;
  private title: string;
  private description: string;
  private isDone: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private labels: ILabel[];

  constructor(
    id: string,
    title: string,
    description: string,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date,
    labels: ILabel[] = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.labels = labels;
  }

  /**
   * Retourne l'identifiant unique de la tâche.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Retourne le titre de la tâche.
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Retourne la description de la tâche.
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * Retourne l'état d'accomplissement de la tâche.
   */
  getIsDone(): boolean {
    return this.isDone;
  }

  /**
   * Retourne les labels associés à la tâche.
   */
  getLabels(): ILabel[] {
    return [...this.labels];
  }

  /**
   * Retourne la date de création de la tâche.
   */
  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  /**
   * Retourne la date de dernière modification.
   */
  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  /**
   * Marque la tâche comme terminée.
   */
  markAsDone(): void {
    this.isDone = true;
    this.updatedAt = new Date();
  }

  /**
   * Marque la tâche comme non terminée.
   */
  markAsUndone(): void {
    this.isDone = false;
    this.updatedAt = new Date();
  }

  /**
   * Met à jour le titre de la tâche.
   * @param title Nouveau titre
   * @throws {InvalidTodoTitleError} Si le titre est vide
   */
  updateTitle(title: string): void {
    if (!title || title.trim() === '') {
      throw new InvalidTodoTitleError();
    }
    this.title = title;
    this.updatedAt = new Date();
  }

  /**
   * Met à jour la description de la tâche.
   * @param description Nouvelle description
   */
  updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  /**
   * Met à jour les labels de la tâche.
   * @param labels Nouveaux labels
   */
  updateLabels(labels: ILabel[]): void {
    this.labels = labels;
    this.updatedAt = new Date();
  }
}
