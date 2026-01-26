import { IDeleteTodoUseCase, DeleteTodoRequest, ITodoRepository, TodoNotFoundError } from '@org/business-protocol';

/**
 * Use Case pour supprimer une tâche.
 */
export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(private todoRepository: ITodoRepository) {}

  /**
   * Supprime une tâche à partir de son ID.
   * @param request Contient l'ID de la tâche à supprimer.
   * @throws TodoNotFoundError si la tâche n'existe pas.
   */
  async execute(request: DeleteTodoRequest): Promise<void> {
    // Verify the todo exists before attempting deletion
    const todo = await this.todoRepository.findById(request.id);
    if (!todo) {
      throw new TodoNotFoundError(request.id);
    }

    // Delete the todo from the repository
    await this.todoRepository.deleteById(request.id);
  }
}
