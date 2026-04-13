import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
    let controller: ChatController;
    let chatService: { startChat: jest.Mock; generateResponse: jest.Mock };

    beforeEach(async () => {
        chatService = {
            startChat: jest.fn().mockResolvedValue({ chatId: 'c1', firstMessage: 'hi' }),
            generateResponse: jest.fn().mockResolvedValue({ text: 'ok' }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [{ provide: ChatService, useValue: chatService }],
        }).compile();

        controller = module.get<ChatController>(ChatController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('startChat delegates to service with jobTitle', async () => {
        const user = { id: 'u1' } as User;
        await controller.startChat(user, { jobTitle: 'Dev' } as any);
        expect(chatService.startChat).toHaveBeenCalledWith(user, 'Dev');
    });

    it('continueChat delegates to service with chatId and message', async () => {
        const user = { id: 'u1' } as User;
        await controller.continueChat('c1', user, { message: 'hey' } as any);
        expect(chatService.generateResponse).toHaveBeenCalledWith(user, 'hey', 'c1');
    });
});
