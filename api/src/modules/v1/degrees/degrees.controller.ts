import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { DegreesService } from './degrees.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { DegreeResponseDto } from '@jobview/shared/src/dtos/degrees/response-degree.dto';
import { CreateDegreeDto, UpdateDegreeDto } from '@jobview/shared';

@Controller('degrees')
export class DegreesController {

    constructor(private readonly degreesService: DegreesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(
        @GetUser() user: User
    ): Promise<DegreeResponseDto[]> {
        return this.degreesService.findAllByUser(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @GetUser() user: User,
        @Body() createDegreeDto: CreateDegreeDto
    ): Promise<DegreeResponseDto> {
        return this.degreesService.create(createDegreeDto, user.id);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.degreesService.findOne(+id);
    // }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @GetUser() user: User,
        @Param('id') degreeId: number,
        @Body() updateDegreeDto: UpdateDegreeDto
    ): Promise<DegreeResponseDto> {
        return this.degreesService.update(updateDegreeDto, degreeId, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeByUserAndDegreeId(
        @GetUser() user: User,
        @Param('id') degreeId: number
    ): Promise<{message: string}> {
        const deleted = await this.degreesService.removeByUserAndDegreeId(degreeId, user.id);

        if (!deleted) {
            throw new HttpException('Degree not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Degree deleted successfully' };
    }
}
