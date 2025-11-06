import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: false,
    entities: ['src/modules/v1/**/*.entity.ts'], 
    migrations: ['src/migrations/*{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
});