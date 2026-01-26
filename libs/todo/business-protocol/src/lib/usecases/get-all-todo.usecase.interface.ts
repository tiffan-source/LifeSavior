import { ITodo } from '@org/todo-domain-protocol';
import { TodoFilters } from '../ports/todo.repository.interface';

/**
 * Requête pour récupérer les tâches.
 */
export interface GetAllTodoRequest {
  filters?: TodoFilters;
}

/**
 * Interface du Use Case GetAllTodo.
 */
export interface IGetAllTodoUseCase {
  /**
   * Exécute la récupération des tâches.
   * @param request Données de la requête.
   * @returns Liste des tâches trouvées.
   */
  execute(request: GetAllTodoRequest): Promise<ITodo[]>;
}
