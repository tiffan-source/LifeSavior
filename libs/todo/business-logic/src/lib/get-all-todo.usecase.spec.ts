import { describe, it, expect, beforeEach } from 'vitest';
import { GetAllTodoUseCase } from './get-all-todo.usecase';
import {
  InMemoryTodoRepository,
  FakeTodo
} from './testing/in-memory';

describe('GetAllTodoUseCase (TDD Strict)', () => {
  let useCase: GetAllTodoUseCase;
  let todoRepo: InMemoryTodoRepository;

  beforeEach(() => {
    todoRepo = new InMemoryTodoRepository();
    useCase = new GetAllTodoUseCase(todoRepo);
  });

  it('should return all todos when no filter is provided', async () => {
    // Arrange
    const t1 = new FakeTodo('1', 'Tâche 1', 'Desc', false, [], new Date(), new Date());
    const t2 = new FakeTodo('2', 'Tâche 2', 'Desc', false, [], new Date(), new Date());
    await todoRepo.save(t1);
    await todoRepo.save(t2);

    // Act
    const result = await useCase.execute({});

    // Assert
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(expect.arrayContaining(['1', '2']));
  });

  it('should filter todos by title', async () => {
    // Arrange
    const t1 = new FakeTodo('1', 'Buy Milk', 'Desc', false, [], new Date(), new Date());
    const t2 = new FakeTodo('2', 'Walk Dog', 'Desc', false, [], new Date(), new Date());
    await todoRepo.save(t1);
    await todoRepo.save(t2);

    // Act
    const result = await useCase.execute({ filters: { title: 'Milk' } });

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Buy Milk');
  });

  it('should filter todos by status (isDone)', async () => {
    // Arrange
    const t1 = new FakeTodo('1', 'Tâche 1', 'Desc', true, [], new Date(), new Date());
    const t2 = new FakeTodo('2', 'Tâche 2', 'Desc', false, [], new Date(), new Date());
    await todoRepo.save(t1);
    await todoRepo.save(t2);

    // Act
    const result = await useCase.execute({ filters: { isDone: true } });

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});
