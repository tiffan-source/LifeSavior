import { InMemoryLabelRepository, FakeLabel } from './testing/in-memory';
import { GetAllLabelsUseCase } from './get-all-labels.usecase';

describe('GetAllLabelsUseCase', () => {
  let repo: InMemoryLabelRepository;
  let useCase: GetAllLabelsUseCase;

  beforeEach(() => {
    repo = new InMemoryLabelRepository();
    // Simulate data
    repo.labels = [
      new FakeLabel('1', 'Work', '#FF0000'),
      new FakeLabel('2', 'Home', '#0000FF')
    ];
    useCase = new GetAllLabelsUseCase(repo);
  });

  it('should return all labels', async () => {
    const result = await useCase.execute();
    expect(result).toHaveLength(2);
    expect(result[0].getName()).toBe('Work');
  });
});
