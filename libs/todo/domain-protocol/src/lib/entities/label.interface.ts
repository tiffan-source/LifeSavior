/**
 * Représente un label (catégorie) pour une tâche.
 */
export interface ILabel {
  id: string;
  name: string;
  color: string;

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
