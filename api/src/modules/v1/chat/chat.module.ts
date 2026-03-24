import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContextsModule } from '../user-contexts/user-contexts.module';
import { UsersModule } from '../users/users.module';

@Module({
    // imports: [TypeOrmModule.forFeature([Chat])],
    imports: [UsersModule, UserContextsModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}


// @Module({
//     imports: [TypeOrmModule.forFeature([Degree])],
//     controllers: [DegreesController],
//     providers: [DegreesService],
//     exports: [DegreesService]
// })
// export class DegreesModule {}