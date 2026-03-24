import { Expose, Type } from "class-transformer";

export class UserContextResponseDto {
    @Expose()
    industry: string;

    @Expose()
    degree: string;

    @Expose()
    experienceYears: string;

    @Expose()
    careerSummary: string
    
    @Expose()
    location: string

    @Expose()
    mobilityType: string

    @Expose()
    specialSituationNote: string
}