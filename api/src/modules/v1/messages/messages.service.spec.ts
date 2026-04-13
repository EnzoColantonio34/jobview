import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    let service: MessagesService;
    let repo: { find: jest.Mock; create: jest.Mock; save: jest.Mock };

    beforeEach(async () => {
        repo = {
            find: jest.fn().mockResolvedValue([]),
            create: jest.fn((x) => x),
            save: jest.fn(async (x) => ({ id: 'm1', ...x })),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessagesService,
                { provide: getRepositoryToken(Message), useValue: repo },
            ],
        }).compile();

        service = module.get<MessagesService>(MessagesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findByConversation queries repo with chat id and ASC order', async () => {
        await service.findByConversation('chat-1');
        expect(repo.find).toHaveBeenCalledWith({
            where: { chat: { id: 'chat-1' } },
            order: { createdAt: 'ASC' },
        });
    });

    it('create persists a message with role + content', async () => {
        const saved = await service.create('chat-1', 'human', 'hello');
        expect(repo.create).toHaveBeenCalledWith({
            content: 'hello',
            role: 'human',
            chat: { id: 'chat-1' },
        });
        expect(repo.save).toHaveBeenCalled();
        expect(saved).toMatchObject({ content: 'hello', role: 'human' });
    });
});
