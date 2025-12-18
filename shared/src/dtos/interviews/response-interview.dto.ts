import { Expose, Type } from 'class-transformer';
import { CompanyResponseDto } from '../companies/response-company.dto';

/**
 * DTO pour les réponses.
 * Définit les champs qui sont exposés publiquement à l'API.
 * Notez l'absence de validateurs (class-validator) car ces données
 * ne sont pas reçues, mais envoyées.
 */
export class InterviewResponseDto {
    @Expose()
    interviewId: string;

    @Expose()
    label: string;

    @Expose()
    state: string;

    @Expose()
    @Type(() => Date)
    emailSentDate: Date;

    @Expose()
    @Type(() => Date)
    interviewDate: Date;

    @Expose()
    @Type(() => Date)
    remindDate: Date;

    @Expose()
    @Type(() => CompanyResponseDto) // Transforme l'objet company en CompanyResponseDto
    company: CompanyResponseDto;

}