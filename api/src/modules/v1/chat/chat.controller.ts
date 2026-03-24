import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async startChat(
        @GetUser() user: User,
        @Body() body: {jobTitle: string}
    ) {
        const result = await this.chatService.startChat(user, body.jobTitle);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/new-message')
    async continueChat(
        @Param('id') chatId: string,
        @GetUser() user: User,
        @Body() body: { message: string }
    ) {
        return this.chatService.generateResponse(
            user,
            body.message,
            chatId,
        );
    }
}