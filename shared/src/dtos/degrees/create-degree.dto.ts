import { Type } from 'class-transformer';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MaxLength,
    IsOptional,
    IsPhoneNumber,
    IsDate
} from 'class-validator';

export class CreateDegreeDto {
    
    @IsNotEmpty({message: 'label is required'})
    @IsString({message: 'label must be a string'})
    @MaxLength(255, { message: 'label can\'t exceed 255 characters.' })
    label: string;

    @IsNotEmpty({message: 'level is required'})
    @IsString({message: 'level must be a string'})
    @MaxLength(255, { message: 'level can\'t exceed 255 characters.' })
    level: string;

    @IsOptional()
    @IsString({message: 'domain must be a string'})
    @MaxLength(255, { message: 'domain can\'t exceed 255 characters.' })
    domain?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date

    @IsOptional()
    @IsString({message: 'description must be a string'})
    description: string;
    
}
