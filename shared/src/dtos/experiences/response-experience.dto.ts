import { Expose, Type } from "class-transformer";

export class ExperienceResponseDto {
    @Expose()
    id: string;

    @Expose()
    label: string;

    @Expose()
    companyName: string;

    @Expose()
    domain: string;

    @Expose()
    description: string;

    @Expose()
    @Type(() => Date)
    startDate: Date;

    @Expose()
    @Type(() => Date)
    endDate: Date;

    // @Expose()
    // @Type(() => CompanyResponseDto) // Transforme l'objet company en CompanyResponseDto
    // company: CompanyResponseDto;

}