import { describe, it, expect } from 'vitest';
import { ITodoFactory, InvalidTodoTitleError } from '@org/todo-domain-protocol';
import { DefaultTodoFactory } from '../factories/default-todo.factory';

describe('DefaultTodo Entity', () => {
  const factory: ITodoFactory = new DefaultTodoFactory();

  describe('Factory: create', () => {
    it('should create a valid Todo (Happy Path)', () => {
      const title = 'Acheter du pain';
      const description = 'Et des croissants';
      const todo = factory.create(title, description);

      expect(todo.id).toBeDefined();
      expect(todo.title).toBe(title);
      expect(todo.description).toBe(description);
      expect(todo.isDone).toBe(false);
      expect(todo.createdAt).toBeInstanceOf(Date);
      expect(todo.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw InvalidTodoTitleError when title is empty', () => {
      expect(() => factory.create('', 'Description'))
        .toThrow(InvalidTodoTitleError);
    });
  });

  describe('Methods', () => {
    it('should update title and refresh updatedAt', async () => {
      const todo = factory.create('Old Title', 'Desc');
      const oldUpdatedAt = todo.updatedAt;

      // Small delay to ensure timestamp difference if necessary,
      // but usually we trust the logic.
      // We will sleep 1ms just to be sure if system is fast.
      await new Promise(r => setTimeout(r, 10));

      todo.updateTitle('New Title');

      expect(todo.title).toBe('New Title');
      expect(todo.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('should throw InvalidTodoTitleError when updating with empty title', () => {
      const todo = factory.create('Valid', 'Desc');
      expect(() => todo.updateTitle('')).toThrow(InvalidTodoTitleError);
    });

    it('should mark todo as done', () => {
      const todo = factory.create('Task', 'Desc');
      expect(todo.isDone).toBe(false);

      todo.markAsDone();

      expect(todo.isDone).toBe(true);
    });
  });
});
