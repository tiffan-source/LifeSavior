import { ITodo, InvalidTodoTitleError, ILabel } from '@org/todo-domain-protocol';

/**
 * Implémentation par défaut de l'entité Todo.
 */
export class DefaultTodo implements ITodo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public isDone: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public labels: ILabel[] = []
  ) {}

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
