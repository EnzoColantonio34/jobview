import { Expose, Type } from 'class-transformer';

/**
 * DTO pour les réponses.
 * Définit les champs qui sont exposés publiquement à l'API.
 * Notez l'absence de validateurs (class-validator) car ces données
 * ne sont pas reçues, mais envoyées.
 */
export class CompanyResponseDto {
    @Expose()
    uuid: string;

    @Expose()
    name: string;

    @Expose()
    city: string;

    @Expose()
    zipCode: number;

    @Expose()
    adress: string;

    @Expose()
    adressExtra: string;

    @Expose()
    email: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    @Type(() => Date) // Garantit que la transformation est bien une Date
    createdAt: Date;
}