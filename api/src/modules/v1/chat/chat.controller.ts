import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
        @Body() body: { message: string, jobTitle: string }
    ) {
        // Simulation du contexte utilisateur (Ici tu devrais le récupérer via ton UserService)
        // const mockUserContext = {
        //     degrees: [{ name: 'Master Informatique' }],
        //     experiences: [{ title: 'Développeur Fullstack Junior' }]
        // };
        console.log(user);

        return this.chatService.generateResponse(
            user, 
            body.jobTitle, 
            body.message
        );
    }
}