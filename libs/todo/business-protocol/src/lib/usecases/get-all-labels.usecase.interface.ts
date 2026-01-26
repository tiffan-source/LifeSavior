import { ILabel } from '@org/todo-domain-protocol';

/**
 * Interface pour le cas d'utilisation : Lister tous les labels.
 */
export interface IGetAllLabelsUseCase {
  /**
   * Exécute la récupération de tous les labels.
   * @returns Une promesse contenant la liste des labels.
   */
  execute(): Promise<ILabel[]>;
}
