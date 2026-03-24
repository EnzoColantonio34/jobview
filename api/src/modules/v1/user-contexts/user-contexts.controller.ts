import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UserContextsService } from './user-contexts.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { UserContextResponseDto, CreateUsercontextDto, UpdateUserContextDto } from '@jobview/shared';

@Controller('user-contexts')
export class UserContextsController {
    constructor(private readonly userContextsService: UserContextsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyContext(
        @GetUser() user: User
    ): Promise<UserContextResponseDto> {
        return this.userContextsService.findByUserId(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async saveMyContext(
        @GetUser() user: User,
        @Body() dto: CreateUsercontextDto
    ) {
        return this.userContextsService.upsertContext(user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateMyContext(
        @GetUser() user: User,
        @Body() dto: UpdateUserContextDto
    ) {
        return this.userContextsService.upsertContext(user.id, dto);
    }

}
