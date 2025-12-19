import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/v1/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/v1/auth/auth.module";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { CompaniesModule } from "./modules/v1/companies/companies.module";
import { InterviewsModule } from "./modules/v1/interviews/interviews.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databasePath = configService.get<string>("DATABASE_PATH");
        if (!databasePath) {
          throw new Error("DATABASE_PATH is not defined in .env");
        }

        return {
          type: "sqlite",
          database: databasePath,
          autoLoadEntities: true,
          synchronize: false,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),

    UsersModule,
    AuthModule,
    CompaniesModule,
    InterviewsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
