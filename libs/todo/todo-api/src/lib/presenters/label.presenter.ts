import { ILabel } from '@org/todo-domain-protocol';
import { LabelNotFoundError } from '@org/todo-business-protocol';
import { LabelResponseDto } from '../dtos/label.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

/**
 * Presenter pour les Labels.
 * Responsable de la transformation des résultats et de la gestion des erreurs.
 */
export class LabelPresenter {
  /**
   * Présente un label sous forme de DTO.
   */
  present(label: ILabel): LabelResponseDto {
    return {
      id: label.getId(),
      name: label.getName(),
      color: label.getColor(),
    };
  }

  /**
   * Présente une liste de labels.
   */
  presentList(labels: ILabel[]): LabelResponseDto[] {
    return labels.map(label => this.present(label));
  }

  /**
   * Gère les erreurs métier et les convertit en exceptions HTTP.
   */
  handleError(error: Error): never {
    if (error instanceof LabelNotFoundError) {
      throw new NotFoundException({
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
