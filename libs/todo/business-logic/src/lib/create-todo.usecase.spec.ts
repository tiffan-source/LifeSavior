import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTodoUseCase } from './create-todo.usecase';
import {
  ITodoRepository,
  ILabelRepository,
  LabelNotFoundError
} from '@org/business-protocol';
import {
  ITodoFactory,
  ILabelFactory,
  ITodo,
  ILabel
} from '@org/todo-domain-protocol';

// --- Mocks ---

const mockTodoRepository = {
  save: vi.fn(),
} as unknown as ITodoRepository;

const mockLabelRepository = {
  findByIds: vi.fn(),
  findByNames: vi.fn(),
  save: vi.fn(),
} as unknown as ILabelRepository;

const mockTodoFactory = {
  create: vi.fn(),
} as unknown as ITodoFactory;

const mockLabelFactory = {
  create: vi.fn(),
} as unknown as ILabelFactory;

// --- Helpers ---

const mockLabel = (id: string, name: string): ILabel => ({
  id, name, color: '#000', updateName: vi.fn(), updateColor: vi.fn()
});

const mockTodo = (id: string, title: string, labels: ILabel[] = []): ITodo => ({
  id, title, description: 'Desc', isDone: false, labels, createdAt: new Date(), updatedAt: new Date(),
  markAsDone: vi.fn(), updateTitle: vi.fn()
});

describe('CreateTodoUseCase', () => {
  let useCase: CreateTodoUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new CreateTodoUseCase(
      mockTodoRepository,
      mockLabelRepository,
      mockTodoFactory,
      mockLabelFactory
    );
  });

  it('should create a simple todo without labels', async () => {
    // Arrange
    const request = { title: 'Tâche simple', description: 'Desc' };
    const createdTodo = mockTodo('1', request.title);

    vi.mocked(mockTodoFactory.create).mockReturnValue(createdTodo);
    vi.mocked(mockTodoRepository.save).mockResolvedValue(createdTodo);

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(mockTodoFactory.create).toHaveBeenCalledWith(request.title, request.description, []);
    expect(mockTodoRepository.save).toHaveBeenCalledWith(createdTodo);
    expect(result).toEqual(createdTodo);
  });

  it('should create a todo with existing labels (by ID)', async () => {
    // Arrange
    const request = { title: 'Tâche', description: 'Desc', labelIds: ['L1', 'L2'] };
    const label1 = mockLabel('L1', 'Urgent');
    const label2 = mockLabel('L2', 'Work');
    const createdTodo = mockTodo('1', request.title, [label1, label2]);

    vi.mocked(mockLabelRepository.findByIds).mockResolvedValue([label1, label2]);
    vi.mocked(mockTodoFactory.create).mockReturnValue(createdTodo);
    vi.mocked(mockTodoRepository.save).mockResolvedValue(createdTodo);

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(mockLabelRepository.findByIds).toHaveBeenCalledWith(['L1', 'L2']);
    expect(mockTodoFactory.create).toHaveBeenCalledWith(request.title, request.description, [label1, label2]);
    expect(result.labels).toHaveLength(2);
  });

  it('should throw LabelNotFoundError if some label IDs are missing', async () => {
    // Arrange
    const request = { title: 'Tâche', description: 'Desc', labelIds: ['L1', 'L_MISSING'] };
    const label1 = mockLabel('L1', 'Urgent');

    vi.mocked(mockLabelRepository.findByIds).mockResolvedValue([label1]); // Only 1 found

    // Act & Assert
    await expect(useCase.execute(request)).rejects.toThrow(LabelNotFoundError);
  });

  it('should create a todo with new labels (by Name) on the fly', async () => {
    // Arrange
    const request = { title: 'Tâche', description: 'Desc', labelNames: ['NewTag'] };
    const newLabel = mockLabel('L_NEW', 'NewTag');
    const createdTodo = mockTodo('1', request.title, [newLabel]);

    vi.mocked(mockLabelRepository.findByNames).mockResolvedValue([]); // Not found existing
    vi.mocked(mockLabelFactory.create).mockReturnValue(newLabel);
    vi.mocked(mockLabelRepository.save).mockResolvedValue(newLabel);
    vi.mocked(mockTodoFactory.create).mockReturnValue(createdTodo);
    vi.mocked(mockTodoRepository.save).mockResolvedValue(createdTodo);

    // Act
    await useCase.execute(request);

    // Assert
    expect(mockLabelRepository.findByNames).toHaveBeenCalledWith(['NewTag']);
    expect(mockLabelFactory.create).toHaveBeenCalledWith('NewTag', expect.any(String)); // Color is generated/default
    expect(mockLabelRepository.save).toHaveBeenCalledWith(newLabel);
    expect(mockTodoFactory.create).toHaveBeenCalledWith(expect.anything(), expect.anything(), [newLabel]);
  });

  it('should reuse existing labels when passed by name', async () => {
     // Arrange
    const request = { title: 'Tâche', description: 'Desc', labelNames: ['ExistingTag'] };
    const existingLabel = mockLabel('L_EXIST', 'ExistingTag');
    const createdTodo = mockTodo('1', request.title, [existingLabel]);

    vi.mocked(mockLabelRepository.findByNames).mockResolvedValue([existingLabel]); // Found
    vi.mocked(mockTodoFactory.create).mockReturnValue(createdTodo);
    vi.mocked(mockTodoRepository.save).mockResolvedValue(createdTodo);

    // Act
    await useCase.execute(request);

    // Assert
    expect(mockLabelFactory.create).not.toHaveBeenCalled(); // Should NOT create
    expect(mockLabelRepository.save).not.toHaveBeenCalled(); // Should NOT save
    expect(mockTodoFactory.create).toHaveBeenCalledWith(expect.anything(), expect.anything(), [existingLabel]);
  });
});
