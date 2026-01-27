import { ILabelFactory, ILabel } from '@org/todo-domain-protocol';
import { DefaultLabel } from '@org/todo-domain-model';

/**
 * Factory pour créer des labels (implémentation en mémoire).
 */
export class LabelFactoryImpl implements ILabelFactory {
  create(name: string, color: string): ILabel {
    return new DefaultLabel(
      this.generateId(),
      name,
      color
    );
  }

  private generateId(): string {
    return `label_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
