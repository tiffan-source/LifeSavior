import { ILabel, InvalidLabelNameError } from '@org/todo-domain-protocol';

/**
 * Implémentation par défaut de l'entité Label.
 */
export class DefaultLabel implements ILabel {
  private readonly id: string;
  private name: string;
  private color: string;

  constructor(id: string, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  /**
   * Retourne l'identifiant unique du label.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Retourne le nom du label.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Retourne la couleur du label.
   */
  getColor(): string {
    return this.color;
  }

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
    this.color = color;
  }
}
