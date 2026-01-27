import { ILabelRepository  } from '@org/todo-business-protocol';
import { ILabel} from '@org/todo-domain-protocol'

/**
 * Implémentation en mémoire du repository de labels (pour prototypage/test).
 */
export class InMemoryLabelRepositoryImpl implements ILabelRepository {
  private labels: Map<string, ILabel> = new Map();

  async findByIds(ids: string[]): Promise<ILabel[]> {
    return ids
      .map(id => this.labels.get(id))
      .filter((label): label is ILabel => label !== undefined);
  }

  async findByNames(names: string[]): Promise<ILabel[]> {
    return Array.from(this.labels.values()).filter(l =>
      names.includes(l.getName())
    );
  }

  async findAll(): Promise<ILabel[]> {
    return Array.from(this.labels.values());
  }

  async findById(id: string): Promise<ILabel | undefined> {
    return this.labels.get(id);
  }

  async save(label: ILabel): Promise<ILabel> {
    this.labels.set(label.getId(), label);
    return label;
  }
}
