import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompanyResponseDto } from './dto/response-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { DeleteCompaniesDto } from './dto/delete-companies.dto';

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
        return this.companiesService.findAllByUser(user.uuid);
    }

    // #endregion

    // #region === POST ===

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createCompanyDto: CreateCompanyDto,
        @GetUser() user: User
    ): Promise<CompanyResponseDto> {
        return this.companiesService.create(createCompanyDto, user.uuid);
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
        @Body() dto: DeleteCompaniesDto, // On récupère le tableau d'IDs
        @GetUser() user: User
    ): Promise<{message: string, count: number}> {
        const count = await this.companiesService.removeBatch(dto.ids, user.uuid);

        return { 
            message: `Batch delete successful. ${count} companies deleted.`,
            count: count
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':uuid')
    async removeByUserAndCompanyUuid(
        @Param('uuid') companyUuid: string, // L'ID de la company (depuis l'URL)
        @GetUser() user: User    // L'ID de l'user (depuis le token)
    ): Promise<{message: string}> {
        // On passe les DEUX IDs au service
        const deleted = await this.companiesService.removeByUserAndCompanyUuid(companyUuid, user.uuid);

        if (!deleted) {
            // Si ça renvoie false, c'est soit que la company n'existe pas,
            // soit qu'elle n'appartient pas à cet utilisateur.
            // Dans les deux cas : 404 Not Found est une bonne réponse de sécurité.
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return { message: 'Company deleted successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeAllByUserUuid(
        @GetUser() user: User
    ): Promise<{message: string, count: number}> {
        // On récupère le nombre de suppressions
        const count = await this.companiesService.removeAllByUserUuid(user.uuid);

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
