import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/v1/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/v1/auth/auth.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CompaniesModule } from './modules/v1/companies/companies.module';
import { InterviewsModule } from './modules/v1/interviews/interviews.module';
import { DegreesModule } from './modules/v1/degrees/degrees.module';
import { ExperiencesModule } from './modules/v1/experiences/experiences.module';
import { UserContextsModule } from './modules/v1/user-contexts/user-contexts.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                database: configService.get<string>('DATABASE_NAME'), 
                autoLoadEntities: true,
                synchronize: true,

                // Naming strategy, transforms myColumn in entity to my_column in database
                namingStrategy: new SnakeNamingStrategy(),
            }),
        }),
        UsersModule,
        AuthModule,
        CompaniesModule,
        InterviewsModule,
        DegreesModule,
        ExperiencesModule,
        UserContextsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}