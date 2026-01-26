/**
 * Requête pour la suppression d'une tâche.
 */
export interface DeleteTodoRequest {
  id: string;
}

/**
 * Interface du Use Case DeleteTodo.
 * @throws TodoNotFoundError si la tâche n'existe pas.
 */
export interface IDeleteTodoUseCase {
  /**
   * Supprime une tâche à partir de son ID.
   * @param request Contient l'ID de la tâche à supprimer.
   */
  execute(request: DeleteTodoRequest): Promise<void>;
}
