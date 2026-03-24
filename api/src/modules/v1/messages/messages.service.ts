import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async findByConversation(chatId: string): Promise<Message[]> {
        return this.messageRepository.find({
            where: { chat: { id: chatId } },
            order: { createdAt: 'ASC' },
        });
    }

    // Pour enregistrer une nouvelle réplique
    async create(chatId: string, role: 'human' | 'ai', content: string) {
        const newMessage = this.messageRepository.create({
            content,
            role,
            chat: { id: chatId },
        });
        return this.messageRepository.save(newMessage);
  }
}
