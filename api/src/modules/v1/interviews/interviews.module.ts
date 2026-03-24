import { Module } from '@nestjs/common';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview.entity';
import { Company } from '../companies/company.entity';
import { CompaniesModule } from '../companies/companies.module';

@Module({
    imports: [TypeOrmModule.forFeature([Interview, Company]), CompaniesModule],
    controllers: [InterviewsController],
    providers: [InterviewsService],
    exports: [InterviewsService]
})
export class InterviewsModule {}
