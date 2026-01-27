import { ITodoRepository, ILabelRepository, TodoFilters } from '../../../../business-protocol/src/index';
import { ITodo, ILabel, ITodoFactory, ILabelFactory, InvalidTodoTitleError } from '@org/todo-domain-protocol';

export class FakeLabel implements ILabel {
  constructor(private id: string, private name: string, private color: string) {}

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getColor(): string { return this.color; }

  updateName(name: string): void { this.name = name; }
  updateColor(color: string): void { this.color = color; }
}

export class FakeTodo implements ITodo {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private isDone: boolean,
    private labels: ILabel[],
    private createdAt: Date,
    private updatedAt: Date
  ) {}

  getId(): string { return this.id; }
  getTitle(): string { return this.title; }
  getDescription(): string { return this.description; }
  getIsDone(): boolean { return this.isDone; }
  getLabels(): ILabel[] { return [...this.labels]; }
  getCreatedAt(): Date { return new Date(this.createdAt); }
  getUpdatedAt(): Date { return new Date(this.updatedAt); }

  markAsDone(): void { this.isDone = true; this.updatedAt = new Date(); }
  markAsUndone(): void { this.isDone = false; this.updatedAt = new Date(); }
  updateTitle(title: string): void {
    if (!title) throw new InvalidTodoTitleError();
    this.title = title;
    this.updatedAt = new Date();
  }
  updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }
  updateLabels(labels: ILabel[]): void {
    this.labels = labels;
    this.updatedAt = new Date();
  }
}

export class InMemoryLabelRepository implements ILabelRepository {
  public labels: ILabel[] = [];

  async findByIds(ids: string[]): Promise<ILabel[]> {
    return this.labels.filter(l => ids.includes(l.getId()));
  }

  async findByNames(names: string[]): Promise<ILabel[]> {
    return this.labels.filter(l => names.includes(l.getName()));
  }

  async findAll(): Promise<ILabel[]> {
    return [...this.labels];
  }

  async findById(id: string): Promise<ILabel | undefined> {
    return this.labels.find(l => l.getId() === id);
  }

  async save(label: ILabel): Promise<ILabel> {
    const idx = this.labels.findIndex(l => l.getId() === label.getId());
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
    const idx = this.todos.findIndex(t => t.getId() === todo.getId());
    if (idx >= 0) {
      this.todos[idx] = todo;
    } else {
      this.todos.push(todo);
    }
    return todo;
  }

  async findAll(filters?: TodoFilters): Promise<ITodo[]> {
    return this.todos.filter(t => {
      if (filters?.title && !t.getTitle().includes(filters.title)) return false;
      if (filters?.isDone !== undefined && t.getIsDone() !== filters.isDone) return false;
      // Implement other filters as needed
      return true;
    });
  }

  async findById(id: string): Promise<ITodo | undefined> {
    return this.todos.find(t => t.getId() === id);
  }

  async deleteById(id: string): Promise<void> {
    const idx = this.todos.findIndex(t => t.getId() === id);
    if (idx >= 0) {
      this.todos.splice(idx, 1);
    }
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
