import { ITodoRepository, ILabelRepository, TodoFilters } from '@org/business-protocol';
import { ITodo, ILabel, ITodoFactory, ILabelFactory, InvalidTodoTitleError } from '@org/todo-domain-protocol';

export class FakeLabel implements ILabel {
  constructor(public id: string, public name: string, public color: string) {}
  updateName(name: string): void { this.name = name; }
  updateColor(color: string): void { this.color = color; }
}

export class FakeTodo implements ITodo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public isDone: boolean,
    public labels: ILabel[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  markAsDone(): void { this.isDone = true; }
  markAsUndone(): void { this.isDone = false; }
  updateTitle(title: string): void {
    if (!title) throw new InvalidTodoTitleError();
    this.title = title;
  }
  updateDescription(description: string): void { this.description = description; }
  updateLabels(labels: ILabel[]): void { this.labels = labels; }
}

export class InMemoryLabelRepository implements ILabelRepository {
  public labels: ILabel[] = [];

  async findByIds(ids: string[]): Promise<ILabel[]> {
    return this.labels.filter(l => ids.includes(l.id));
  }

  async findByNames(names: string[]): Promise<ILabel[]> {
    return this.labels.filter(l => names.includes(l.name));
  }

  async save(label: ILabel): Promise<ILabel> {
    const hiddenLabel = label as any;
    // Simulate ID generation if not present (simple mock behavior)
    if (!label.id) {
       // In a real fake, we might assign an ID.
       // Start with a random id if none provided?
       // Factories usually provide part of it, but save might finalize.
       // Here assuming factory provided ID or we leave it.
    }
    const idx = this.labels.findIndex(l => l.id === label.id);
    if (idx >= 0) {
      this.labels[idx] = label;
    } else {
      this.labels.push(label);
    }
    return label;
  }
}

export class InMemoryTodoRepository implements ITodoRepository {
  public todos: ITodo[] = [];

  async save(todo: ITodo): Promise<ITodo> {
    const idx = this.todos.findIndex(t => t.id === todo.id);
    if (idx >= 0) {
      this.todos[idx] = todo;
    } else {
      this.todos.push(todo);
    }
    return todo;
  }

  async findAll(filters?: TodoFilters): Promise<ITodo[]> {
    return this.todos.filter(t => {
      if (filters?.title && !t.title.includes(filters.title)) return false;
      if (filters?.isDone !== undefined && t.isDone !== filters.isDone) return false;
      // Implement other filters as needed
      return true;
    });
  }

  async findById(id: string): Promise<ITodo | undefined> {
    return this.todos.find(t => t.id === id);
  }
}

export class InMemoryTodoFactory implements ITodoFactory {
  create(title: string, description: string, labels: ILabel[]): ITodo {
    return new FakeTodo(
      Math.random().toString(36).substring(7), // Simple ID
      title,
      description,
      false,
      labels,
      new Date(),
      new Date()
    );
  }
}

export class InMemoryLabelFactory implements ILabelFactory {
  create(name: string, color: string): ILabel {
    return new FakeLabel(
      Math.random().toString(36).substring(7),
      name,
      color
    );
  }
}
