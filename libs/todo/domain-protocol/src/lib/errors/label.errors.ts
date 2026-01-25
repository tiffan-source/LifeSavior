export class InvalidLabelNameError extends Error {
  constructor() {
    super('Le nom du label ne peut pas être vide.');
    this.name = 'InvalidLabelNameError';
  }
}

export class InvalidLabelColorError extends Error {
  constructor() {
    super('La couleur du label est invalide.');
    this.name = 'InvalidLabelColorError';
  }
}
