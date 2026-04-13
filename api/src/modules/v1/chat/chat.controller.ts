import { Body, Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { StartChatDto, SendMessageDto } from '@jobview/shared';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Throttle({ default: { ttl: 60_000, limit: 10 } })
    @Post('')
    async startChat(
        @GetUser() user: User,
        @Body() body: StartChatDto,
    ) {
        return this.chatService.startChat(user, body.jobTitle);
    }

    @UseGuards(JwtAuthGuard)
    @Throttle({ default: { ttl: 60_000, limit: 10 } })
    @Post(':id/new-message')
    async continueChat(
        @Param('id', ParseUUIDPipe) chatId: string,
        @GetUser() user: User,
        @Body() body: SendMessageDto,
    ) {
        return this.chatService.generateResponse(user, body.message, chatId);
    }
}
