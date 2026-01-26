import { ILabelRepository } from '@org/business-protocol';
import { ILabel } from '@org/todo-domain-protocol';

export class InMemoryLabelRepository implements ILabelRepository {
  private readonly labels: Map<string, ILabel> = new Map();

  async findByIds(ids: string[]): Promise<ILabel[]> {
    return ids.map(id => this.labels.get(id)).filter((l): l is ILabel => !!l);
  }

  async findByNames(names: string[]): Promise<ILabel[]> {
    return Array.from(this.labels.values()).filter(l => names.includes(l.name));
  }

  async save(label: ILabel): Promise<ILabel> {
    this.labels.set(label.id, label);
    return label;
  }
}
