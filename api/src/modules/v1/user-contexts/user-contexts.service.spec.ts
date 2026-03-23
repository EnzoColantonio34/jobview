import { Test, TestingModule } from '@nestjs/testing';
import { UserContextsService } from './user-contexts.service';

describe('UserContextsService', () => {
  let service: UserContextsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContextsService],
    }).compile();

    service = module.get<UserContextsService>(UserContextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
