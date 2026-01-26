import { InMemoryLabelRepository, FakeLabel } from './testing/in-memory';
import { EditLabelUseCase } from './edit-label.usecase';

describe('EditLabelUseCase', () => {
  let repo: InMemoryLabelRepository;
  let useCase: EditLabelUseCase;

  beforeEach(() => {
    repo = new InMemoryLabelRepository();
    // Simulate data
    const label = new FakeLabel('1', 'Work', '#FF0000');
    repo.labels = [label];
    useCase = new EditLabelUseCase(repo);
  });

  it('should update label name', async () => {
    const result = await useCase.execute({
      labelId: '1',
      name: 'Updated Work'
    });
    expect(result.name).toBe('Updated Work');
    expect(result.color).toBe('#FF0000');
  });

  it('should update label color', async () => {
    const result = await useCase.execute({
      labelId: '1',
      color: '#00FF00'
    });
    expect(result.name).toBe('Work');
    expect(result.color).toBe('#00FF00');
  });

  it('should update both name and color', async () => {
    const result = await useCase.execute({
      labelId: '1',
      name: 'Updated Work',
      color: '#00FF00'
    });
    expect(result.name).toBe('Updated Work');
    expect(result.color).toBe('#00FF00');
  });
});
