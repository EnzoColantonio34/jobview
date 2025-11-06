import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { UserResponseDto } from './dto/response-user.dto';

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

    private async _findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
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

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this._findByUsername(username);
        if (!user) return null;

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) return null;

        return user;
    }

    async findByUuid(uuid: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { uuid } });
    }

    /**
     * Met à jour le refresh token hashé pour un utilisateur spécifique.
     *
     * @param uuid L'UUID de l'utilisateur à mettre à jour.
     * @param hashedToken Le nouveau token hashé, ou 'null' pour déconnecter l'utilisateur.
     */
    async setCurrentHashedRefreshToken(uuid: string, hashedToken: string | null): Promise<void> {
        await this.userRepository.update(uuid, {
            currentHashedRefreshToken: hashedToken,
        });
    }

    async deleteUserByUuid(uuid: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { uuid } });

        if (!user) {
            return false;
        }

        // Supporte la suppression en cascade comparé à .delete(uuid)
        await this.userRepository.remove(user);

        return true;
    }

}
