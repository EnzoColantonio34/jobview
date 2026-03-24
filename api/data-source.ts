import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: ConfigService.get<string>('DB_HOST', 'localhost'),
    port: ConfigService.get<number>('DB_PORT'),
    username: ConfigService.get<string>('DB_USER'),
    password: ConfigService.get<string>('DB_PASSWORD'),
    database: ConfigService.get<string>('DB_NAME'),
    synchronize: false,
    entities:[__dirname + '/**/*.entity{.ts,.js}'], 
    migrations: ['src/migrations/*{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
});