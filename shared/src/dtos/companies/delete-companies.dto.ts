import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class DeleteCompaniesDto {
    @IsArray()
    @ArrayNotEmpty({ message: 'La liste des IDs ne peut pas être vide.' })
    @IsUUID('7', { each: true, message: 'Tous les éléments doivent être des UUIDs valides.' })
    ids: string[];
}