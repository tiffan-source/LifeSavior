import { describe, it, expect, beforeEach } from 'vitest';
import { CreateTodoUseCase } from './create-todo.usecase';
import { LabelNotFoundError } from '@org/business-protocol';
import {
  InMemoryLabelRepository,
  InMemoryTodoRepository,
  InMemoryTodoFactory,
  InMemoryLabelFactory,
  FakeLabel
} from './testing/in-memory';

describe('CreateTodoUseCase (TDD Strict)', () => {
  let useCase: CreateTodoUseCase;
  let todoRepo: InMemoryTodoRepository;
  let labelRepo: InMemoryLabelRepository;
  let todoFactory: InMemoryTodoFactory;
  let labelFactory: InMemoryLabelFactory;

  beforeEach(() => {
    todoRepo = new InMemoryTodoRepository();
    labelRepo = new InMemoryLabelRepository();
    todoFactory = new InMemoryTodoFactory();
    labelFactory = new InMemoryLabelFactory();
    useCase = new CreateTodoUseCase(todoRepo, labelRepo, todoFactory, labelFactory);
  });

  it('should create and save a todo without labels', async () => {
    // Act
    const result = await useCase.execute({
      title: 'My Todo',
      description: 'Desc'
    });

    // Assert (State Verification)
    expect(result.id).toBeDefined();
    expect(result.title).toBe('My Todo');

    const saved = await todoRepo.findById(result.id);
    expect(saved).toBeDefined();
    expect(saved?.title).toBe('My Todo');
  });

  it('should throw if labels ids do not exist', async () => {
    // Act & Assert
    await expect(useCase.execute({
      title: 'Todo',
      labelIds: ['missing-id']
    })).rejects.toThrow(LabelNotFoundError);
  });

  it('should link existing labels by ID', async () => {
    // Arrange
    const existingLabel = new FakeLabel('l1', 'Work', 'red');
    await labelRepo.save(existingLabel);

    // Act
    const result = await useCase.execute({
      title: 'Todo with Label',
      labelIds: ['l1']
    });

    // Assert
    expect(result.labels).toHaveLength(1);
    expect(result.labels[0].id).toBe('l1');

    const saved = await todoRepo.findById(result.id);
    expect(saved?.labels[0].id).toBe('l1');
  });

  it('should create new labels on the fly if provided by name', async () => {
    // Act
    const result = await useCase.execute({
      title: 'Todo with new Label',
      labelNames: ['Urgent']
    });

    // Assert
    expect(result.labels).toHaveLength(1);
    expect(result.labels[0].name).toBe('Urgent');

    // Verify label persisted
    const allLabels = await labelRepo.findByNames(['Urgent']);
    expect(allLabels).toHaveLength(1);
  });

  it('should reuse existing labels by name', async () => {
    // Arrange
    const existingLabel = new FakeLabel('l2', 'Urgent', 'red');
    await labelRepo.save(existingLabel);

    // Act
    const result = await useCase.execute({
      title: 'Todo',
      labelNames: ['Urgent']
    });

    // Assert
    expect(result.labels).toHaveLength(1);
    expect(result.labels[0].id).toBe('l2'); // Should be the existing one
  });
});
