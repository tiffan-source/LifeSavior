import { ILabel, InvalidLabelNameError } from '@org/todo-domain-protocol';

/**
 * Implémentation par défaut de l'entité Label.
 */
export class DefaultLabel implements ILabel {
  constructor(
    public id: string,
    public name: string,
    public color: string
  ) {}

  /**
   * Met à jour le nom du label.
   * @param name Nouveau nom
   * @throws {InvalidLabelNameError} Si le nom est vide
   */
  updateName(name: string): void {
    if (!name || name.trim() === '') {
      throw new InvalidLabelNameError();
    }
    this.name = name;
  }

  /**
   * Met à jour la couleur du label.
   * @param color Nouvelle couleur
   */
  updateColor(color: string): void {
     // Validation could be added here
     this.color = color;
  }
}
