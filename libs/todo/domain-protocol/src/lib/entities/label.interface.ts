/**
 * Représente un label (catégorie) pour une tâche.
 */
export interface ILabel {
  /**
   * Retourne l'identifiant unique du label.
   */
  getId(): string;

  /**
   * Retourne le nom du label.
   */
  getName(): string;

  /**
   * Retourne la couleur du label.
   */
  getColor(): string;

  /**
   * Met à jour le nom du label.
   * @param name Nouveau nom
   * @throws {InvalidLabelNameError} Si le nom est vide
   */
  updateName(name: string): void;

  /**
   * Met à jour la couleur du label.
   * @param color Nouvelle couleur
   */
  updateColor(color: string): void;
}
