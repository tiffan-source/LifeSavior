export class InvalidTodoTitleError extends Error {
  constructor() {
    super('Le titre de la tâche ne peut pas être vide.');
    this.name = 'InvalidTodoTitleError';
  }
}
