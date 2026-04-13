import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SystemMessage } from '@langchain/core/messages';
import { MessagesService } from '../messages/messages.service';
import { UserContextsService } from '../user-contexts/user-contexts.service';
import { UsersService } from '../users/users.service';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

describe('ChatService', () => {
    let service: ChatService;
    let chatRepo: { findOne: jest.Mock; create: jest.Mock; save: jest.Mock; update: jest.Mock };
    let messagesService: { findByConversation: jest.Mock; create: jest.Mock };
    let userContextsService: { findByUserId: jest.Mock };
    let usersService: { findOneWithDetails: jest.Mock };
    let invokeMock: jest.Mock;

    beforeEach(async () => {
        chatRepo = {
            findOne: jest.fn(),
            create: jest.fn((x) => x),
            save: jest.fn(async (x) => ({ id: 'chat-1', ...x })),
            update: jest.fn(),
        };
        messagesService = {
            findByConversation: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue(undefined),
        };
        userContextsService = { findByUserId: jest.fn().mockResolvedValue(null) };
        usersService = {
            findOneWithDetails: jest.fn().mockResolvedValue({ id: 'u1', degrees: [], experiences: [] }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChatService,
                { provide: getRepositoryToken(Chat), useValue: chatRepo },
                { provide: MessagesService, useValue: messagesService },
                { provide: UserContextsService, useValue: userContextsService },
                { provide: UsersService, useValue: usersService },
                { provide: ConfigService, useValue: { get: jest.fn((_k, d) => d) } },
            ],
        }).compile();

        service = module.get<ChatService>(ChatService);
        invokeMock = jest.fn().mockResolvedValue({ content: 'ai-reply' });
        (service as any).model = { invoke: invokeMock };
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        it('scopes query by user id (IDOR fix)', async () => {
            chatRepo.findOne.mockResolvedValue({ id: 'chat-1', user: { id: 'u1' }, messages: [] });
            await service.findOne('chat-1', 'u1');
            expect(chatRepo.findOne).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: 'chat-1', user: { id: 'u1' } },
                    relations: ['messages'],
                }),
            );
        });

        it('throws NotFoundException when repo returns null', async () => {
            chatRepo.findOne.mockResolvedValue(null);
            await expect(service.findOne('chat-1', 'u1')).rejects.toBeInstanceOf(NotFoundException);
        });
    });

    describe('generateResponse', () => {
        it('injects a phase SystemMessage into model.invoke', async () => {
            chatRepo.findOne.mockResolvedValue({
                id: 'chat-1',
                jobTitle: 'Dev',
                status: 'ongoing',
                user: { id: 'u1' },
                messages: [],
            });

            await service.generateResponse({ id: 'u1' } as any, 'hello', 'chat-1');

            expect(invokeMock).toHaveBeenCalledTimes(1);
            const messages = invokeMock.mock.calls[0][0];
            const phaseMsg = messages[1];
            expect(phaseMsg).toBeInstanceOf(SystemMessage);
            expect(String(phaseMsg.content)).toContain('<phase>');
            expect(String(phaseMsg.content)).toContain("PHASE D'EXPLORATION");
        });

        it('switches to closing phase at count >= 14', async () => {
            chatRepo.findOne.mockResolvedValue({
                id: 'chat-1',
                jobTitle: 'Dev',
                status: 'ongoing',
                user: { id: 'u1' },
                messages: [],
            });
            messagesService.findByConversation.mockResolvedValue(
                Array.from({ length: 13 }, (_, i) => ({ role: i % 2 ? 'ai' : 'human', content: 'x' })),
            );

            await service.generateResponse({ id: 'u1' } as any, 'hello', 'chat-1');

            const phaseMsg = invokeMock.mock.calls[0][0][1];
            expect(String(phaseMsg.content)).toContain('PHASE DE CLÔTURE');
        });
    });
});
