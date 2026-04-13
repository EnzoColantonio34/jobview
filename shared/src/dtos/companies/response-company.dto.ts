import { Expose, Transform, Type } from 'class-transformer';
import { InterviewResponseDto } from '../interviews/response-interview.dto';

/**
 * DTO pour les réponses.
 * Définit les champs qui sont exposés publiquement à l'API.
 * Notez l'absence de validateurs (class-validator) car ces données
 * ne sont pas reçues, mais envoyées.
 */
export class CompanyResponseDto {
    @Expose()
    @Transform(({ obj }) => obj.id, { toClassOnly: true })
    companyId: number;

    @Expose()
    name: string;

    @Expose()
    city: string;

    @Expose()
    zipCode: string;

    @Expose()
    address: string;

    @Expose()
    addressExtra: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    deletedAt: Date;

    @Expose()
    @Type(() => Date) // Garantit que la transformation est bien une Date
    createdAt: Date;

    @Expose()
    @Type(() => InterviewResponseDto) // <--- Très important pour la transformation
    interviews: InterviewResponseDto[];

}
