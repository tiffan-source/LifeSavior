import { ITodo, InvalidTodoTitleError } from '@org/todo-domain-protocol';
import {
  LabelNotFoundError,
  TodoNotFoundError,
} from '@org/todo-business-protocol';
import { TodoResponseDto } from '../dtos/todo.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

/**
 * Presenter pour les Todos.
 * Responsable de la transformation des résultats et de la gestion des erreurs.
 */
export class TodoPresenter {
  /**
   * Présente une todo sous forme de DTO.
   */
  present(todo: ITodo): TodoResponseDto {
    return {
      id: todo.getId(),
      title: todo.getTitle(),
      description: todo.getDescription(),
      isDone: todo.getIsDone(),
      labels: todo.getLabels().map(label => ({
        id: label.getId(),
        name: label.getName(),
        color: label.getColor(),
      })),
      createdAt: todo.getCreatedAt().toISOString(),
      updatedAt: todo.getUpdatedAt().toISOString(),
    };
  }

  /**
   * Présente une liste de todos.
   */
  presentList(todos: ITodo[]): TodoResponseDto[] {
    return todos.map(todo => this.present(todo));
  }

  /**
   * Gère les erreurs métier et les convertit en exceptions HTTP.
   */
  handleError(error: Error): never {
    if (error instanceof InvalidTodoTitleError) {
      throw new BadRequestException({
        code: 'INVALID_TODO_TITLE',
        message: error.message,
      });
    }

    if (error instanceof TodoNotFoundError) {
      throw new NotFoundException({
        code: 'TODO_NOT_FOUND',
        message: error.message,
      });
    }

    if (error instanceof LabelNotFoundError) {
      throw new BadRequestException({
        code: 'LABEL_NOT_FOUND',
        message: error.message,
      });
    }

    // Erreur inconnue
    throw new BadRequestException({
      code: 'UNKNOWN_ERROR',
      message: error.message,
    });
  }
}
