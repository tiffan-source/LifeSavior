import { ILabel } from '../entities/label.interface';

/**
 * Interface pour la création de labels.
 */
export interface ILabelFactory {
  /**
   * Crée une nouvelle instance de Label.
   * @param name Nom du label
   * @param color Couleur du label (hex recommended)
   * @throws {InvalidLabelNameError} Si le nom est vide
   */
  create(name: string, color: string): ILabel;
}
