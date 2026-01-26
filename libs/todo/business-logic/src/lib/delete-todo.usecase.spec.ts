import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteTodoUseCase } from './delete-todo.usecase';
import { TodoNotFoundError } from '@org/business-protocol';
import {
  InMemoryTodoRepository,
  InMemoryTodoFactory
} from './testing/in-memory';

describe('DeleteTodoUseCase (TDD Strict)', () => {
  let useCase: DeleteTodoUseCase;
  let todoRepo: InMemoryTodoRepository;
  let todoFactory: InMemoryTodoFactory;

  beforeEach(() => {
    todoRepo = new InMemoryTodoRepository();
    todoFactory = new InMemoryTodoFactory();
    useCase = new DeleteTodoUseCase(todoRepo);
  });

  it('should delete a todo by id when it exists', async () => {
    // Arrange: Create and save a todo
    const todo = todoFactory.create('Todo to Delete', 'Description', []);
    await todoRepo.save(todo);

    // Verify it exists before deletion
    expect(await todoRepo.findById(todo.id)).toBeDefined();

    // Act: Delete the todo
    await useCase.execute({ id: todo.id });

    // Assert: Verify it no longer exists (State Verification)
    const found = await todoRepo.findById(todo.id);
    expect(found).toBeUndefined();
  });

  it('should throw TodoNotFoundError when trying to delete a non-existent todo', async () => {
    // Act & Assert
    await expect(
      useCase.execute({ id: 'non-existent-id' })
    ).rejects.toThrow(TodoNotFoundError);
  });

  it('should not affect other todos when deleting one', async () => {
    // Arrange: Create and save multiple todos
    const todo1 = todoFactory.create('Todo 1', 'Desc 1', []);
    const todo2 = todoFactory.create('Todo 2', 'Desc 2', []);
    await todoRepo.save(todo1);
    await todoRepo.save(todo2);

    // Act: Delete only the first todo
    await useCase.execute({ id: todo1.id });

    // Assert: First todo should be gone, second should remain
    expect(await todoRepo.findById(todo1.id)).toBeUndefined();
    expect(await todoRepo.findById(todo2.id)).toBeDefined();
    expect((await todoRepo.findAll()).length).toBe(1);
  });
});
