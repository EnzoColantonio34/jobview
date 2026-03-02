import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateExperienceDto, ExperienceResponseDto, UpdateExperienceDto } from '@jobview/shared';


@Injectable()
export class ExperiencesService {

    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
    ) {}

    async create(createCompanyDto: CreateExperienceDto, userUuid: string): Promise<ExperienceResponseDto> {
        
        const newExperience = this.experienceRepository.create({
            ...createCompanyDto,
            user: { id: userUuid } as User
        });

        const savedExperience = await this.experienceRepository.save(newExperience);

        return plainToInstance(ExperienceResponseDto, savedExperience);
    }

    async findAllByUser(userUuid: string): Promise<ExperienceResponseDto[]> {
        const experiences = await this.experienceRepository.find({
            where: {
                user: { id: userUuid } 
            },
            order: {
                label: 'ASC'
            }
        });

        return plainToInstance(ExperienceResponseDto, experiences);
    }

    findOne(id: number) {
        return `This action returns a #${id} experience`;
    }

    async update(dto: UpdateExperienceDto, experienceId: number, userId: string): Promise<ExperienceResponseDto> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('Aucune donnée à modifier.');
        }

        const experience = await this.experienceRepository.findOne({
            where: { 
                id: experienceId,
                user: { id: userId } 
            }
        });

        if (!experience) {
            throw new NotFoundException('Experience non trouvée.');
        }

        this.experienceRepository.merge(experience, dto);

        const savedCompany = await this.experienceRepository.save(experience);

        return plainToInstance(ExperienceResponseDto, savedCompany);
    }

    async removeByUserAndExperienceId(experienceId: number, userUuid: string): Promise<boolean> {
        const result = await this.experienceRepository.delete({ 
            id: experienceId, 
            user: { id: userUuid }
        });

        return (result.affected ?? 0) > 0;
    }

}
