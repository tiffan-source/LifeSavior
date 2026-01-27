import {
  ICreateTodoUseCase,
  CreateTodoRequest,
  ITodoRepository,
  ILabelRepository,
  LabelNotFoundError
} from '../../../business-protocol/src/index';
import { ITodo, ITodoFactory, ILabelFactory, ILabel } from '@org/todo-domain-protocol';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly labelRepository: ILabelRepository,
    private readonly todoFactory: ITodoFactory,
    private readonly labelFactory: ILabelFactory
  ) {}

  async execute(request: CreateTodoRequest): Promise<ITodo> {
    const labels: ILabel[] = [];

    // 1. Resolve Labels by ID
    if (request.labelIds && request.labelIds.length > 0) {
      const foundById = await this.labelRepository.findByIds(request.labelIds);

      // Check for missing IDs
      if (foundById.length !== request.labelIds.length) {
        // Find which ones are missing for better error message
        const foundIds = foundById.map(l => l.getId());
        const missingIds = request.labelIds.filter(id => !foundIds.includes(id));
        throw new LabelNotFoundError(missingIds);
      }
      labels.push(...foundById);
    }

    // 2. Resolve Labels by Name (On the fly)
    if (request.labelNames && request.labelNames.length > 0) {
      // Clean up names (unique, trimmed)
      const names = [...new Set(request.labelNames.map(n => n.trim()).filter(n => n.length > 0))];

      if (names.length > 0) {
        const existingByName = await this.labelRepository.findByNames(names);
        labels.push(...existingByName);

        const existingNames = existingByName.map(l => l.getName());
        const missingNames = names.filter(n => !existingNames.includes(n));

        for (const name of missingNames) {
          // Default color for on-the-fly creation
          const newLabel = this.labelFactory.create(name, '#CCCCCC');
          const savedLabel = await this.labelRepository.save(newLabel);
          labels.push(savedLabel);
        }
      }
    }

    // 3. Create Todo
    const todo = this.todoFactory.create(request.title, request.description, labels);

    // 4. Save
    return this.todoRepository.save(todo);
  }
}
