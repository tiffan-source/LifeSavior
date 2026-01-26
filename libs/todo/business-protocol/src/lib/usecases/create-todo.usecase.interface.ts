import { ITodo } from '@org/todo-domain-protocol';

/**
 * Requête pour la création d'une tâche.
 */
export interface CreateTodoRequest {
  title: string;
  description: string;
  labelIds?: string[];
  labelNames?: string[];
}

/**
 * Interface du Use Case CreateTodo.
 */
export interface ICreateTodoUseCase {
  /**
   * Exécute la création d'une tâche.
   * @param request Données de la requête.
   * @returns La tâche créée.
   */
  execute(request: CreateTodoRequest): Promise<ITodo>;
}
