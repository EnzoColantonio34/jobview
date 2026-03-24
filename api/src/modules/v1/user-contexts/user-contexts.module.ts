import { Module } from '@nestjs/common';
import { UserContextsService } from './user-contexts.service';
import { UserContextsController } from './user-contexts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContext } from './entities/user-context.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserContext])],
    controllers: [UserContextsController],
    providers: [UserContextsService],
    exports: [UserContextsService]
})
export class UserContextsModule {}
