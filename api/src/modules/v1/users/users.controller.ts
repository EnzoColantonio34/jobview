import { Controller, Delete, Get, HttpException, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserResponseDto } from './dto/response-user.dto';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteAccount(@GetUser() user: User): Promise<{message: string}> {
        const deleted = await this.usersService.deleteUserByUuid(user.uuid);

        if (!deleted) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Account deleted successfully' };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
        const deleted = await this.usersService.deleteUserByUuid(id);

        if (!deleted) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Account deleted successfully' };
    }

}
