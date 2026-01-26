import { ITodo } from '@org/todo-domain-protocol';

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
}
