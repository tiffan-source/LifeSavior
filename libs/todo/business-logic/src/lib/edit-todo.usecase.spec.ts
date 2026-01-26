import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditTodoUseCase } from './edit-todo.usecase';
import {
  ITodoRepository,
  ILabelRepository,
  EditTodoRequest,
} from '@org/business-protocol';
import { ITodo, ILabel } from '@org/todo-domain-protocol';

describe('EditTodoUseCase', () => {
  let useCase: EditTodoUseCase;
  let todoRepository: ITodoRepository;
  let labelRepository: ILabelRepository;

  const mockTodo = (id: string, title: string, labels: ILabel[] = []): ITodo => ({
    id,
    title,
    description: 'Old Description',
    isDone: false,
    labels,
    createdAt: new Date(),
    updatedAt: new Date(),
    markAsDone: vi.fn(),
    markAsUndone: vi.fn(),
    updateTitle: vi.fn(),
    updateDescription: vi.fn(),
    updateLabels: vi.fn(),
  });

  const existingTodo = mockTodo('todo-1', 'Old Title');

  beforeEach(() => {
    todoRepository = {
      findById: vi.fn().mockResolvedValue(existingTodo),
      save: vi.fn().mockImplementation((t) => Promise.resolve(t)),
    } as unknown as ITodoRepository;

    labelRepository = {
      findByIds: vi.fn().mockResolvedValue([]),
    } as unknown as ILabelRepository;

    useCase = new EditTodoUseCase(todoRepository, labelRepository);
  });

  it('should throw an error if todo is not found', async () => {
    vi.spyOn(todoRepository, 'findById').mockResolvedValue(undefined);

    const request: EditTodoRequest = {
      todoId: 'non-existent',
      title: 'New Title',
    };

    await expect(useCase.execute(request)).rejects.toThrow('Todo not found');
  });

  it('should update the title if provided', async () => {
    const request: EditTodoRequest = {
      todoId: 'todo-1',
      title: 'New Title',
    };

    const result = await useCase.execute(request);

    expect(existingTodo.updateTitle).toHaveBeenCalledWith('New Title');
    expect(todoRepository.save).toHaveBeenCalledWith(existingTodo);
    expect(result).toBe(existingTodo);
  });

  it('should update the description if provided', async () => {
    const request: EditTodoRequest = {
      todoId: 'todo-1',
      description: 'New Description',
    };

    const result = await useCase.execute(request);

    expect(existingTodo.updateDescription).toHaveBeenCalledWith('New Description');
    expect(todoRepository.save).toHaveBeenCalledWith(existingTodo);
  });

  it('should mark todo as done if isDone is true', async () => {
    const request: EditTodoRequest = {
      todoId: 'todo-1',
      isDone: true,
    };

    const result = await useCase.execute(request);

    expect(existingTodo.markAsDone).toHaveBeenCalled();
    expect(todoRepository.save).toHaveBeenCalledWith(existingTodo);
  });

  it('should mark todo as undone if isDone is false', async () => {
    existingTodo.isDone = true;
    const request: EditTodoRequest = {
      todoId: 'todo-1',
      isDone: false,
    };

    const result = await useCase.execute(request);

    expect(existingTodo.markAsUndone).toHaveBeenCalled();
    expect(todoRepository.save).toHaveBeenCalledWith(existingTodo);
  });

  it('should update labels if labelIds are provided', async () => {
    const newLabel: ILabel = { id: 'label-1', name: 'Label 1', color: 'red', updateName: vi.fn(), updateColor: vi.fn() };
    vi.spyOn(labelRepository, 'findByIds').mockResolvedValue([newLabel]);

    const request: EditTodoRequest = {
      todoId: 'todo-1',
      labelIds: ['label-1'],
    };

    const result = await useCase.execute(request);

    expect(labelRepository.findByIds).toHaveBeenCalledWith(['label-1']);
    expect(existingTodo.updateLabels).toHaveBeenCalledWith([newLabel]);
    expect(todoRepository.save).toHaveBeenCalledWith(existingTodo);
  });

  it('should throw error if some labels are not found', async () => {
    vi.spyOn(labelRepository, 'findByIds').mockResolvedValue([]);

    const request: EditTodoRequest = {
      todoId: 'todo-1',
      labelIds: ['missing-label'],
    };

    await expect(useCase.execute(request)).rejects.toThrow('Some labels not found');
  });
});
