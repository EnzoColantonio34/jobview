import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CompanyResponseDto, CreateCompanyDto, DeleteCompaniesDto, UpdateCompanyDto } from '@jobview/shared';

@Controller('api/v1/companies')
export class CompaniesController {
    
    constructor(private readonly companiesService: CompaniesService) {}
    
    // #region === GET ===

    @Get("/all")
    async findAll(): Promise<CompanyResponseDto[]> {
        return this.companiesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(
        @GetUser() user: User
    ): Promise<CompanyResponseDto[]> {
        return this.companiesService.findAllByUser(user.userId);
    }

    // #endregion

    // #region === POST ===

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @GetUser() user: User,
        @Body() createCompanyDto: CreateCompanyDto
    ): Promise<CompanyResponseDto> {
        return this.companiesService.create(createCompanyDto, user.userId);
    }

    // #endregion

    // #region === PATCH ===

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @GetUser() user: User,
        @Param('id') companyId: string,
        @Body() updateCompanyDto: UpdateCompanyDto
    ): Promise<CompanyResponseDto> {
        return this.companiesService.update(updateCompanyDto, companyId, user.userId);
    }

    // #endregion

    // #region === DELETE ===

    /**
     * Suppression par lot (Batch Delete)
     * Route : DELETE /api/v1/companies/batch
     * Body : { "ids": ["uuid1", "uuid2", ...] }
     */
    @UseGuards(JwtAuthGuard)
    @Delete('batch') 
    async removeBatch(
        @GetUser() user: User,
        @Body() dto: DeleteCompaniesDto // On récupère le tableau d'IDs
    ): Promise<{message: string, count: number}> {
        const count = await this.companiesService.removeBatch(dto.ids, user.userId);

        return { 
            message: `Batch delete successful. ${count} companies deleted.`,
            count: count
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':uuid')
    async removeByUserAndCompanyUuid(
        @GetUser() user: User,
        @Param('uuid') companyUuid: string
    ): Promise<{message: string}> {
        const deleted = await this.companiesService.removeByUserAndCompanyUuid(companyUuid, user.userId);

        if (!deleted) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Company deleted successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeAllByUserUuid(
        @GetUser() user: User
    ): Promise<{message: string, count: number}> {
        const count = await this.companiesService.removeAllByUserUuid(user.userId);

        if (count === 0) {
            return { 
                message: 'No companies to delete.',
                count: count
            };
        }

        return { 
            message: `All companies deleted successfully, ${count} deleted.`, 
            count: count
        };
    }

    // #endregion

}
