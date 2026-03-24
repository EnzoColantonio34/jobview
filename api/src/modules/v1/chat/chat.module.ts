import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContextsModule } from '../user-contexts/user-contexts.module';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';
import { Chat } from './chat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Chat]), UsersModule, UserContextsModule, MessagesModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}