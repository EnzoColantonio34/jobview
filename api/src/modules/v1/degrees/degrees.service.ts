import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Degree } from './entities/degree.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateDegreeDto, DegreeResponseDto, UpdateDegreeDto } from '@jobview/shared';

@Injectable()
export class DegreesService {

    constructor(
        @InjectRepository(Degree)
        private readonly degreeRepository: Repository<Degree>,
    ) {}

    async create(createDegreeDto: CreateDegreeDto, userUuid: string): Promise<DegreeResponseDto> {
        const existingDegree = await this.degreeRepository.findOne({
            where: {
                label: createDegreeDto.label,
                user: { id: userUuid }
            }
        });

        let degreeToSave: Degree;

        if (existingDegree) {
            throw new ConflictException(`Un diplôme nommé "${createDegreeDto.label}" existe déjà.`);
            
        } else {
            degreeToSave = this.degreeRepository.create({
                ...CreateDegreeDto,
                user: { id: userUuid } as User
            });
        }

        const savedCompany = await this.degreeRepository.save(degreeToSave);

        return plainToInstance(DegreeResponseDto, savedCompany);
    }

    async findAllByUser(userUuid: string): Promise<DegreeResponseDto[]> {
        const degrees = await this.degreeRepository.find({
            where: {
                user: { id: userUuid } 
            },
            order: {
                label: 'ASC'
            }
        });

        return plainToInstance(DegreeResponseDto, degrees);
    }

    async removeByUserAndDegreeId(degreeId: number, userUuid: string): Promise<boolean> {
        const result = await this.degreeRepository.delete({
            id: degreeId,
            user: { id: userUuid }
        });

        return (result.affected ?? 0) > 0;
    }

    async update(dto: UpdateDegreeDto, degreeId: number, userId: string): Promise<DegreeResponseDto> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('Aucune donnée à modifier.');
        }

        const degree = await this.degreeRepository.findOne({
            where: { 
                id: degreeId,
                user: { id: userId } 
            }
        });

        if (!degree) {
            throw new NotFoundException('Diplôme non trouvé.');
        }

        if (dto.label && dto.label !== degree.label) {
            const existingName = await this.degreeRepository.findOne({
                where: { 
                    label: dto.label, 
                    user: { id: userId } 
                }
            });

            if (existingName) {
                throw new ConflictException(`Vous avez déjà un diplôme nommé "${dto.label}".`);
            }
        }

        this.degreeRepository.merge(degree, dto);

        const savedCompany = await this.degreeRepository.save(degree);

        return plainToInstance(DegreeResponseDto, savedCompany);
    }

  findAll() {
    return `This action returns all degrees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} degree`;
  }


  remove(id: number) {
    return `This action removes a #${id} degree`;
  }
}
