import { ILabel } from '@org/todo-domain-protocol';

/**
 * Requête pour l'édition d'un label.
 */
export interface EditLabelRequest {
  labelId: string;
  name?: string;
  color?: string;
}

/**
 * Interface pour le cas d'utilisation : Éditer un label.
 */
export interface IEditLabelUseCase {
  /**
   * Exécute l'édition d'un label.
   * @param request Données de la requête.
   * @returns Le label édité.
   * @throws {LabelNotFoundError} Si le label n'existe pas.
   */
  execute(request: EditLabelRequest): Promise<ILabel>;
}
