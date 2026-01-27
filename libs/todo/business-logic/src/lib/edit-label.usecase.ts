import {
  IEditLabelUseCase,
  EditLabelRequest,
  ILabelRepository,
  LabelNotFoundError
} from '../../../business-protocol/src/index';
import { ILabel } from '@org/todo-domain-protocol';

export class EditLabelUseCase implements IEditLabelUseCase {
  constructor(private readonly labelRepository: ILabelRepository) {}

  async execute(request: EditLabelRequest): Promise<ILabel> {
    // Recherche et valide l'existence du label
    const foundLabel = await this.labelRepository.findById(request.labelId);

    if (!foundLabel) {
      throw new LabelNotFoundError([request.labelId]);
    }

    // Applique les mises à jour
    if (request.name !== undefined) {
      foundLabel.updateName(request.name);
    }

    if (request.color !== undefined) {
      foundLabel.updateColor(request.color);
    }

    // Persiste et retourne
    return this.labelRepository.save(foundLabel);
  }
}
