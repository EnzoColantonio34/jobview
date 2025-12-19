import { Expose, Type } from "class-transformer";

export class DegreeResponseDto {
    @Expose()
    id: string;

    @Expose()
    label: string;

    @Expose()
    level: string;

    @Expose()
    domain: string;

    @Expose()
    @Type(() => Date)
    startDate: Date;

    @Expose()
    @Type(() => Date)
    endDate: Date;

    @Expose()
    @Type(() => Date)
    description: Date;

    // @Expose()
    // @Type(() => CompanyResponseDto) // Transforme l'objet company en CompanyResponseDto
    // company: CompanyResponseDto;

}