import { describe, it, expect, beforeEach } from 'vitest';
import { EditTodoUseCase } from './edit-todo.usecase';
import {
  InMemoryLabelRepository,
  InMemoryTodoRepository,
  FakeTodo,
  FakeLabel
} from './testing/in-memory';

describe('EditTodoUseCase (TDD Strict)', () => {
  let useCase: EditTodoUseCase;
  let todoRepo: InMemoryTodoRepository;
  let labelRepo: InMemoryLabelRepository;
  let existingTodo: FakeTodo;

  beforeEach(async () => {
    todoRepo = new InMemoryTodoRepository();
    labelRepo = new InMemoryLabelRepository();
    useCase = new EditTodoUseCase(todoRepo, labelRepo);

    existingTodo = new FakeTodo('todo-1', 'Old Title', 'Old Description', false, [], new Date(), new Date());
    await todoRepo.save(existingTodo);
  });

  it('should throw an error if todo is not found', async () => {
    const request = {
      todoId: 'non-existent',
      title: 'New Title',
    };

    await expect(useCase.execute(request)).rejects.toThrow('Todo not found');
  });

  it('should update the title if provided', async () => {
    const request = {
      todoId: 'todo-1',
      title: 'New Title',
    };

    const result = await useCase.execute(request);

    // Assert State
    expect(result.getTitle()).toBe('New Title');
    const saved = await todoRepo.findById('todo-1');
    expect(saved?.getTitle()).toBe('New Title');
  });

  it('should update the description if provided', async () => {
    const request = {
      todoId: 'todo-1',
      description: 'New Description',
    };

    const result = await useCase.execute(request);

    expect(result.getDescription()).toBe('New Description');
  });

  it('should mark todo as done if isDone is true', async () => {
    const request = {
      todoId: 'todo-1',
      isDone: true,
    };

    const result = await useCase.execute(request);

    expect(result.getIsDone()).toBe(true);
  });

  it('should mark todo as undone if isDone is false', async () => {
    // Arrange: Ensure it starts as done
    existingTodo.markAsDone();
    await todoRepo.save(existingTodo);

    const request = {
      todoId: 'todo-1',
      isDone: false,
    };

    const result = await useCase.execute(request);

    expect(result.getIsDone()).toBe(false);
  });

  it('should update labels if labelIds are provided', async () => {
    // Arrange
    const newLabel = new FakeLabel('label-1', 'Label 1', 'red');
    await labelRepo.save(newLabel);

    const request = {
      todoId: 'todo-1',
      labelIds: ['label-1'],
    };

    const result = await useCase.execute(request);

    // Assert
    expect(result.getLabels()).toHaveLength(1);
    expect(result.getLabels()[0].getId()).toBe('label-1');
  });

  it('should throw error if some labels are not found', async () => {
    const request = {
      todoId: 'todo-1',
      labelIds: ['missing-label'],
    };

    await expect(useCase.execute(request)).rejects.toThrow('Some labels not found');
  });
});
