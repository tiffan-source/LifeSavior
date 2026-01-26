export class LabelNotFoundError extends Error {
  constructor(ids: string[]) {
    super(`Labels introuvables: ${ids.join(', ')}`);
    this.name = 'LabelNotFoundError';
  }
}
