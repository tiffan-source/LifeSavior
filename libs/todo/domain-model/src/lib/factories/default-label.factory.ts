import { ILabel, ILabelFactory, InvalidLabelNameError } from '@org/todo-domain-protocol';
import { DefaultLabel } from '../entities/default-label.entity';

/**
 * Factory pour créer des instances de DefaultLabel.
 */
export class DefaultLabelFactory implements ILabelFactory {
  /**
   * Crée une nouvelle instance de Label.
   * @param name Nom du label
   * @param color Couleur du label
   * @throws {InvalidLabelNameError} Si le nom est vide
   */
  create(name: string, color: string): ILabel {
    if (!name || name.trim() === '') {
      throw new InvalidLabelNameError();
    }

    const id = Math.random().toString(36).substring(2, 15);

    return new DefaultLabel(
      id,
      name,
      color
    );
  }
}
