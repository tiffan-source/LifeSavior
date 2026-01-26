import { IGetAllLabelsUseCase, ILabelRepository } from '../../../business-protocol/src/index';
import { ILabel } from '@org/todo-domain-protocol';

export class GetAllLabelsUseCase implements IGetAllLabelsUseCase {
  constructor(private readonly labelRepository: ILabelRepository) {}

  async execute(): Promise<ILabel[]> {
    return this.labelRepository.findAll();
  }
}
