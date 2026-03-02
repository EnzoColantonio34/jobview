import { Test, TestingModule } from '@nestjs/testing';
import { UserContextsController } from './user-contexts.controller';
import { UserContextsService } from './user-contexts.service';

describe('UserContextsController', () => {
  let controller: UserContextsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserContextsController],
      providers: [UserContextsService],
    }).compile();

    controller = module.get<UserContextsController>(UserContextsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
