import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, IsNull, Not, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { CheckAvailabilityDto, CreateUserDto, UpdateUserDto, UserResponseDto } from '@jobview/shared';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find();
        return plainToInstance(UserResponseDto, users);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: [
                { email: createUserDto.email },
                { username: createUserDto.username },
                { phoneNumber: createUserDto.phoneNumber },
            ],
        });

        if (existingUser) {
            if (existingUser.email === createUserDto.email) {
                throw new HttpException('Email already used', HttpStatus.CONFLICT);
            }
            if (existingUser.username === createUserDto.username) {
                throw new HttpException('Username already taken', HttpStatus.CONFLICT);
            }
            if (existingUser.phoneNumber === createUserDto.phoneNumber) {
                throw new HttpException('Phone number already used', HttpStatus.CONFLICT);
            }
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    public async validateUser(usernameOrEmail: string, password: string): Promise<User | null> {
        const user = await this._findByUsernameOrEmail(usernameOrEmail);
        if (!user) return null;

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) return null;

        return user;
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {

        if (Object.keys(updateUserDto).length === 0) {
            throw new BadRequestException('You must add at least one value to change.');
        }

        const conflictConditions: FindOptionsWhere<User>[] = []; 

        if (updateUserDto.email) {
            conflictConditions.push({ email: updateUserDto.email, userId: Not(userId) });
        }
        if (updateUserDto.username) {
            conflictConditions.push({ username: updateUserDto.username, userId: Not(userId) });
        }
        if (updateUserDto.phoneNumber) {
            conflictConditions.push({ phoneNumber: updateUserDto.phoneNumber, userId: Not(userId) });
        }

        if (conflictConditions.length > 0) {
            const existingUser = await this.userRepository.findOne({
                where: conflictConditions
            });

            if (existingUser) {
                if (updateUserDto.email && existingUser.email === updateUserDto.email) {
                    throw new ConflictException('Email already in use');
                }

                if (updateUserDto.phoneNumber && existingUser.phoneNumber === updateUserDto.phoneNumber) {
                    throw new ConflictException('Phone number already in use');
                }
                
                throw new ConflictException('Username already taken');
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        await this.userRepository.update(userId, updateUserDto);

        const updatedUser = await this.userRepository.findOneBy({ userId });

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return plainToInstance(UserResponseDto, updatedUser);
    }

    async checkAvailability(dto: CheckAvailabilityDto, currentUserId?: string): Promise<{ available: boolean }> {
        const whereConditions: FindOptionsWhere<User>[] = []; 

        if (dto.email) {
            const condition: FindOptionsWhere<User> = { email: dto.email };
        
            if (currentUserId) {
                condition.userId = Not(currentUserId);
            }
            
            whereConditions.push(condition);
        }
        
        if (dto.username) {
            const condition: FindOptionsWhere<User> = { username: dto.username };

            if (currentUserId) {
                condition.userId = Not(currentUserId);
            }

            whereConditions.push(condition);
        }

        if (whereConditions.length === 0) {
            return { available: true };
        }

        const count = await this.userRepository.count({
            where: whereConditions
        });

        return { available: count === 0 };
    }

    private async _findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        return this.userRepository.findOne({ 
            where: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ] 
        });
    }

    private async _findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findByUuid(userId: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { userId } });
    }

    /**
     * Met à jour le refresh token hashé pour un utilisateur spécifique.
     *
     * @param uuid L'UUID de l'utilisateur à mettre à jour.
     * @param hashedToken Le nouveau token hashé, ou 'null' pour déconnecter l'utilisateur.
     */
    async setCurrentHashedRefreshToken(uuid: string, hashedToken: string | null): Promise<void> {
        if (hashedToken == null) {
            console.log("logout")
            await this.userRepository.update(
                { userId: uuid, currentHashedRefreshToken: Not(IsNull()) }, // Condition : seulement si non null
                { currentHashedRefreshToken: hashedToken }
            );
        } else {
            console.log("login")
            await this.userRepository.update(uuid, {
                currentHashedRefreshToken: hashedToken,
            });
        }
    }

    async deleteUserByUuid(userId: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { userId } });

        if (!user) {
            return false;
        }

        await this.userRepository.remove(user);

        return true;
    }

}
