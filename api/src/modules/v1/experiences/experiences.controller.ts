import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { ExperienceResponseDto, CreateExperienceDto, UpdateExperienceDto } from '@jobview/shared';

@Controller('experiences')
export class ExperiencesController {
    
    constructor(private readonly experiencesService: ExperiencesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(
        @GetUser() user: User
    ): Promise<ExperienceResponseDto[]> {
        return this.experiencesService.findAllByUser(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @GetUser() user: User,
        @Body() createExperienceDto: CreateExperienceDto
    ): Promise<ExperienceResponseDto> {
        return this.experiencesService.create(createExperienceDto, user.id);
    }

    // @Get()
    // findAll() {
    //     return this.experiencesService.findAll();
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.experiencesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @GetUser() user: User,
        @Param('id') experienceId: number,
        @Body() updateExperienceDto: UpdateExperienceDto
    ): Promise<ExperienceResponseDto> {
        return this.experiencesService.update(updateExperienceDto, experienceId, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeByUserAndExperienceId(
        @GetUser() user: User,
        @Param('id') experienceId: number
    ): Promise<{message: string}> {
        const deleted = await this.experiencesService.removeByUserAndExperienceId(experienceId, user.id);

        if (!deleted) {
            throw new HttpException('Experience not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Experience deleted successfully' };
    }
}
