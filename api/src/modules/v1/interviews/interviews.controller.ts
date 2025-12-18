import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateInterviewDto, InterviewResponseDto } from '@jobview/shared';

@Controller('api/v1/interviews')
export class InterviewsController {

    constructor(private readonly interviewsService: InterviewsService) {}

    // #region === GET ===

    @Get("/all")
    async findAll(): Promise<InterviewResponseDto[]> {
        return this.interviewsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(
        @GetUser() user: User
    ): Promise<InterviewResponseDto[]> {
        return this.interviewsService.findAllByUser(user.userId);
    }

    // #endregion

    // #region === POST ===

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createInterviewDto: CreateInterviewDto,
        @GetUser() user: User
    ): Promise<InterviewResponseDto> {
        return this.interviewsService.create(createInterviewDto, user.userId);
    }

    // #endregion

    // #region === DELETE ===

    @UseGuards(JwtAuthGuard)
    @Delete(':uuid')
    async removeByUserAndInterviewUuid(
        @Param('uuid') interviewUuid: string,
        @GetUser() user: User
    ): Promise<{message: string}> {
        const deleted = await this.interviewsService.removeByUserAndInterviewUuid(interviewUuid, user.userId);

        if (!deleted) {

            throw new HttpException('Interview not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Interview deleted successfully' };
    }

    // #endregion

}
