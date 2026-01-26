import { ITodo } from '@org/todo-domain-protocol';

export interface TodoFilters {
  title?: string;
  isDone?: boolean;
  labelIds?: string[];
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Interface de repository pour la persistance des tâches.
 */
export interface ITodoRepository {
  /**
   * Sauvegarde une tâche.
   * @param todo Tâche à sauvegarder.
   * @returns La tâche sauvegardée.
   */
  save(todo: ITodo): Promise<ITodo>;

  /**
   * Récupère une tâche par son identifiant.
   * @param id Identifiant de la tâche.
   * @returns La tâche si elle existe, sinon undefined.
   */
  findById(id: string): Promise<ITodo | undefined>;

  /**
   * Récupère toutes les tâches correspondant aux filtres.
   * @param filters Filtres optionnels.
   * @returns Liste des tâches trouvées.
   */
  findAll(filters?: TodoFilters): Promise<ITodo[]>;

  /**
   * Supprime une tâche par son identifiant.
   * @param id Identifiant de la tâche.
   */
  deleteById(id: string): Promise<void>;
}
