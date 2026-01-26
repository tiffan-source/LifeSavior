import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllTodoUseCase } from './get-all-todo.usecase';
import { ITodoRepository } from '@org/business-protocol';
import { ITodo } from '@org/todo-domain-protocol';

// --- Mocks ---
const mockTodoRepository = {
  findAll: vi.fn(),
} as unknown as ITodoRepository;

// --- Helpers ---
const mockTodo = (id: string, title: string, isDone: boolean = false): ITodo => ({
  id, title, description: 'Desc', isDone, labels: [], createdAt: new Date(), updatedAt: new Date(),
  markAsDone: vi.fn(), updateTitle: vi.fn()
});

describe('GetAllTodoUseCase', () => {
  let useCase: GetAllTodoUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    useCase = new GetAllTodoUseCase(mockTodoRepository);
  });

  it('should return all todos when no filter is provided', async () => {
    // Arrange
    const todos = [mockTodo('1', 'Tâche 1'), mockTodo('2', 'Tâche 2')];
    vi.mocked(mockTodoRepository.findAll).mockResolvedValue(todos);

    // Act
    const result = await useCase.execute({});

    // Assert
    expect(mockTodoRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(todos);
  });

  it('should pass filters to repository', async () => {
    // Arrange
    const filters = { title: 'Tâche', isDone: true };
    const todos = [mockTodo('1', 'Tâche 1', true)];
    vi.mocked(mockTodoRepository.findAll).mockResolvedValue(todos);

    // Act
    const result = await useCase.execute({ filters });

    // Assert
    expect(mockTodoRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toEqual(todos);
  });
});
