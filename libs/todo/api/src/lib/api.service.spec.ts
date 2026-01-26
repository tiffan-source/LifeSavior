import { Test } from '@nestjs/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    service = module.get(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
