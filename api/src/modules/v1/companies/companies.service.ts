import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/user.entity';
import { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from '@jobview/shared';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async findAll(): Promise<CompanyResponseDto[]> {
        const companies = await this.companyRepository.find({
            withDeleted: true,
            // (Optionnel) Tu peux trier pour voir les supprimés à la fin ou au début
            // order: {
            //     deletedAt: 'ASC', // NULLs (actifs) en premier généralement
            //     name: 'ASC'
            // }
        });
        return plainToInstance(CompanyResponseDto, companies);
    }

    // Order by name ASC
    async findAllByUser(userUuid: string): Promise<CompanyResponseDto[]> {
        const companies = await this.companyRepository.find({
            where: {
                user: { userId: userUuid } 
            },
            relations: ['interviews'],
            order: {
                name: 'ASC'
            }
        });

        return plainToInstance(CompanyResponseDto, companies);
    }

    async create(createCompanyDto: CreateCompanyDto, userUuid: string): Promise<CompanyResponseDto> {
        const existingCompany = await this.companyRepository.findOne({
            where: {
                name: createCompanyDto.name,
                user: { userId: userUuid }
            },
            withDeleted: true 
        });

        let companyToSave: Company;

        if (existingCompany) {
            if (!existingCompany.deletedAt) {
                throw new ConflictException(`Une entreprise nommée "${createCompanyDto.name}" existe déjà.`);
            }

            existingCompany.deletedAt = null; 
            
            companyToSave = this.companyRepository.merge(existingCompany, createCompanyDto);
            
        } else {
            companyToSave = this.companyRepository.create({
                ...createCompanyDto,
                user: { userId: userUuid } as User
            });
        }

        const savedCompany = await this.companyRepository.save(companyToSave);

        return plainToInstance(CompanyResponseDto, savedCompany);
    }

    async removeBatch(ids: string[], userUuid: string): Promise<number> {
        const result = await this.companyRepository.delete({
            companyId: In(ids), 
            user: { userId: userUuid } 
        });

        return result.affected ?? 0;
    }

    async removeByUserAndCompanyUuid(companyUuid: string, userUuid: string): Promise<boolean> {
        const result = await this.companyRepository.softDelete({
            companyId: companyUuid,
            user: { userId: userUuid }
        });

        return (result.affected ?? 0) > 0;
    }

    async removeAllByUserUuid(userUuid: string): Promise<number> {
        const result = await this.companyRepository.delete({
            user: { userId: userUuid }
        });

        return result.affected ?? 0;
    }

    async update(dto: UpdateCompanyDto, companyId: string, userId: string): Promise<CompanyResponseDto> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('Aucune donnée à modifier.');
        }

        const company = await this.companyRepository.findOne({
            where: { 
                companyId: companyId,
                user: { userId: userId } 
            }
        });

        if (!company) {
            throw new NotFoundException('Entreprise non trouvée.');
        }

        if (dto.name && dto.name !== company.name) {
            const existingName = await this.companyRepository.findOne({
                where: { 
                    name: dto.name, 
                    user: { userId: userId } 
                }
            });

            if (existingName) {
                throw new ConflictException(`Vous avez déjà une entreprise nommée "${dto.name}".`);
            }
        }

        this.companyRepository.merge(company, dto);

        const savedCompany = await this.companyRepository.save(company);

        return plainToInstance(CompanyResponseDto, savedCompany, { 
            excludeExtraneousValues: true 
        });
    }

}
