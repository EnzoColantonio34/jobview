import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './interview.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/company.entity';
import { plainToInstance } from 'class-transformer';
import { CreateInterviewDto, InterviewResponseDto } from '@jobview/shared';

@Injectable()
export class InterviewsService {

    constructor(
        @InjectRepository(Interview)
        private readonly interviewRepository: Repository<Interview>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async findAll(): Promise<InterviewResponseDto[]> {

        const interviews = await this.interviewRepository.find({
            relations: ['company'],
            
            withDeleted: true, 
            
            order: {
                interviewDate: 'DESC'
            }
        });
        
        return plainToInstance(InterviewResponseDto, interviews);
    }

    async findAllByUser(userUuid: string): Promise<InterviewResponseDto[]> {
        
        const interviews = await this.interviewRepository.find({
            where: {
                company: {
                    user: { userId: userUuid }
                }
            },
            relations: ['company'], 
            withDeleted: true,
            order: {
                interviewDate: 'DESC' 
            }
        });

        return plainToInstance(InterviewResponseDto, interviews);
    }

    async create(createInterviewDto: CreateInterviewDto, userId: string): Promise<InterviewResponseDto> {
        const company = await this.companyRepository.findOne({
            where: { 
                companyId: createInterviewDto.companyId,
                user: { userId: userId }
            }
        });

        if (!company) {
            throw new NotFoundException('Company not found');
        }

        const interview = this.interviewRepository.create({
            ...createInterviewDto,
            company: { companyId: createInterviewDto.companyId } as Company
        });

        const savedInterview = await this.interviewRepository.save(interview);

        return plainToInstance(InterviewResponseDto, savedInterview);

    }

    async removeByUserAndInterviewUuid(interviewUuid: string, userUuid: string): Promise<boolean> {
        const interview = await this.interviewRepository.findOne({
            where: {
                interviewId: interviewUuid,
                company: {
                    user: { userId: userUuid }
                }
            },
            withDeleted: true
        });

        if (!interview) {
            return false;
        }
        
        const result = await this.interviewRepository.delete(interviewUuid);

        return (result.affected ?? 0) > 0;
    }

}
