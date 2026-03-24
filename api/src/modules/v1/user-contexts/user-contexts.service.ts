import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContext } from './entities/user-context.entity';
import { plainToInstance } from 'class-transformer';
import { UserContextResponseDto, CreateUsercontextDto, UpdateUserContextDto } from '@jobview/shared';

@Injectable()
export class UserContextsService {

    constructor(
        @InjectRepository(UserContext)
        private readonly contextRepository: Repository<UserContext>,
    ) {}

    async findByUserId(userId: string): Promise<UserContextResponseDto> {
        const context = await this.contextRepository.findOne({
            where: { user: { id: userId } }
        });
        
        if (!context) {
            throw new NotFoundException(`Contexte non trouvé pour l'utilisateur ${userId}`);
        }

        return plainToInstance(UserContextResponseDto, context);;
    }

    async upsertContext(userId: string, dto: CreateUsercontextDto | UpdateUserContextDto): Promise<UserContextResponseDto> {
        let context = await this.contextRepository.findOne({
            where: { user: { id: userId } }
        });

        if (context) {
            context = this.contextRepository.merge(context, dto);
        } else {
            context = this.contextRepository.create({
                ...dto,
                user: { id: userId }
            });
        }

        const saved = await this.contextRepository.save(context);
        
        return plainToInstance(UserContextResponseDto, saved, { 
            excludeExtraneousValues: true 
        });
    }

    async checkIfContextExists(userId: string): Promise<boolean> {
        const count = await this.contextRepository.count({
            where: { user: { id: userId } }
        });
        return count > 0;
    }

}
