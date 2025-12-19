import { IsArray, IsUUID, ArrayNotEmpty, IsNumber } from 'class-validator';

export class DeleteCompaniesDto {
    @IsArray()
    @ArrayNotEmpty({ message: 'La liste des IDs ne peut pas être vide.' })
    @IsNumber({}, { message: 'companyId must be a number' })
    ids: string[];
}