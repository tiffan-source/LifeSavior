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
   * Récupère tous les labels.
   * @returns Liste de tous les labels.
   */
  findAll(): Promise<ILabel[]>;

  /**
   * Trouve un label par son ID.
   * @param id ID du label.
   * @returns Le label trouvé, ou undefined s'il n'existe pas.
   */
  findById(id: string): Promise<ILabel | undefined>;

  /**
   * Sauvegarde un label.
   * @param label Label à sauvegarder.
   * @returns Le label sauvegardé.
   */
  save(label: ILabel): Promise<ILabel>;
}
