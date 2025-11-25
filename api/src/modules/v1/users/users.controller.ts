import { Controller, Delete, Get, HttpException, HttpStatus, UseGuards, Param, Patch, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserResponseDto } from './dto/response-user.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // #region === GET ===

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findMe(
        @GetUser() user: User
    ): Promise<UserResponseDto> {
        // L'utilisateur est déjà là, on le transforme juste en DTO pour masquer le mot de passe
        return plainToInstance(UserResponseDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check-availability')
    async checkAvailability(
        @Query() dto: CheckAvailabilityDto, // On récupère les params de l'URL (?email=...&username=...)
        @GetUser() user: User
    ): Promise<{ available: boolean }> {
        return this.usersService.checkAvailability(dto, user.uuid);
    }

    // #endregion

    // #region === PATCH ===

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateMe(
        @GetUser() user: User, 
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserResponseDto> {
        // On passe l'UUID (qui vient du token) et les nouvelles données
        return this.usersService.update(user.uuid, updateUserDto);
    }

    // #endregion

    // #region === DELETE ===

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteAccount(
        @GetUser() user: User
    ): Promise<{message: string}> {
        const deleted = await this.usersService.deleteUserByUuid(user.uuid);

        if (!deleted) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Account deleted successfully' };
    }

    @Delete(':uuid')
    async deleteUser(
        @Param('uuid') uuid: string
    ): Promise<{ message: string }> {
        const deleted = await this.usersService.deleteUserByUuid(uuid);

        if (!deleted) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Account deleted successfully' };
    }

    // #endregion

}
