import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule {}
