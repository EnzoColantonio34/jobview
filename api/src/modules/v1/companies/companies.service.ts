import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { In, Repository } from 'typeorm';
import { CompanyResponseDto } from './dto/response-company.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async findAll(): Promise<CompanyResponseDto[]> {
        const users = await this.companyRepository.find();
        return plainToInstance(CompanyResponseDto, users);
    }

    async findAllByUser(userId: string): Promise<CompanyResponseDto[]> {
        // Récupérer les entreprises
        const companies = await this.companyRepository.find({
            where: {
                // TypeORM est intelligent : on peut filtrer sur la relation "user"
                // en spécifiant simplement son "uuid".
                user: { uuid: userId } 
            },
            // Optionnel : Si tu veux ordonner par nom, par exemple
            order: {
                name: 'ASC'
            }
        });

        // Transformer le tableau d'entités en tableau de DTOs
        return plainToInstance(CompanyResponseDto, companies);
    }

    async create(createCompanyDto: CreateCompanyDto, userId: string): Promise<CompanyResponseDto> {
        const company = this.companyRepository.create({
            ...createCompanyDto,
            user: { uuid: userId } as User 
        });

        const savedCompany = await this.companyRepository.save(company);

        return plainToInstance(CompanyResponseDto, savedCompany);
    }

    async removeBatch(ids: string[], userId: string): Promise<number> {
        const result = await this.companyRepository.delete({
            // 1. L'UUID doit être DANS la liste fournie
            uuid: In(ids), 
            
            // 2. ET (Sécurité) L'utilisateur doit être le propriétaire
            user: { uuid: userId } 
        });

        return result.affected ?? 0;
    }

    async removeByUserAndCompanyUuid(companyUuid: string, userUuid: string): Promise<boolean> {
        const result = await this.companyRepository.delete({
            uuid: companyUuid,       // Critère 1 : C'est la bonne company
            user: { uuid: userUuid } // Critère 2 : Elle appartient bien à cet user !
        });

        // result.affected contient le nombre de lignes supprimées.
        // Si c'est > 0, c'est que la suppression a marché.
        // Si c'est 0, c'est que la company n'existe pas OU n'est pas à toi.
        return (result.affected ?? 0) > 0;
    }

    async removeAllByUserUuid(userUuid: string): Promise<number> {
        const result = await this.companyRepository.delete({
            user: { uuid: userUuid }
        });

        // On retourne simplement le nombre (0 si rien n'a été supprimé)
        return result.affected ?? 0;
    }

}
