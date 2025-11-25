import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response-dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtRefreshGuard } from './jwt/jwt-refresh.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { CheckAvailabilityDto } from '../users/dto/check-availability.dto';
import { UsersService } from '../users/users.service';

type RefreshTokenPayload = {
    uuid: string;
    refreshToken: string;
};

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    // #region === GET ===

    @Get('check-availability')
    async checkAvailabilityPublic(
        @Query() dto: CheckAvailabilityDto
    ): Promise<{ available: boolean }> {
        return this.usersService.checkAvailability(dto);
    }

    // #endregion

    // #region === POST ===
    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<AuthResponseDto> {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(
        @GetUser() user: User
    ): Promise<{ message: string }> {
        return this.authService.logout(user.uuid);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(
        @GetUser() user: RefreshTokenPayload
    ): Promise<{ access_token: string }> {
        const { uuid, refreshToken } = user;
        return this.authService.refreshAccessToken(uuid, refreshToken);
    }

    // #endregion
}