import { ILabel } from '@org/todo-domain-protocol';

/**
 * Interface de repository pour la persistance des labels.
 */
export interface ILabelRepository {
  /**
   * Trouve des labels par leurs IDs.
   * @param ids Liste des IDs.
   * @returns Liste des labels trouvés.
   */
  findByIds(ids: string[]): Promise<ILabel[]>;

  /**
   * Trouve des labels par leurs noms (exact match).
   * @param names Liste des noms.
   * @returns Liste des labels trouvés.
   */
  findByNames(names: string[]): Promise<ILabel[]>;

  /**
   * Sauvegarde un label.
   * @param label Label à sauvegarder.
   * @returns Le label sauvegardé.
   */
  save(label: ILabel): Promise<ILabel>;
}
