export class LabelNotFoundError extends Error {
  constructor(ids: string[]) {
    super(`Labels introuvables: ${ids.join(', ')}`);
    this.name = 'LabelNotFoundError';
  }
}

export class TodoNotFoundError extends Error {
  constructor(id: string) {
    super(`Tâche introuvable: ${id}`);
    this.name = 'TodoNotFoundError';
  }
}
