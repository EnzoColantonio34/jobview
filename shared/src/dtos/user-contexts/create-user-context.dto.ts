import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateUsercontextDto {

    @IsString()
    @MaxLength(255)
    industry: string;

    @IsString()
    @MaxLength(255)
    degree: string;

    @IsString()
    @MaxLength(50)
    experienceYears: string;

    @IsString()
    careerSummary: string;

    @IsString()
    @MaxLength(255)
    location: string;

    @IsString()
    @MaxLength(100)
    mobilityType: string;

    @IsOptional()
    @IsString()
    specialSituationNote?: string;

}
