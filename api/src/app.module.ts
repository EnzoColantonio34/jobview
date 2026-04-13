import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
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
import { ChatModule } from './modules/v1/chat/chat.module';
import { MessagesModule } from './modules/v1/messages/messages.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 20 }]),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                autoLoadEntities: true,
                synchronize: configService.get<string>('DB_SYNCHRONIZE') !== 'false',

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
        UserContextsModule,
        ChatModule,
        MessagesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class AppModule {}