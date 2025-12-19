import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    IsOptional,
    IsDate
} from 'class-validator';

export class CreateExperienceDto {
    
    @IsNotEmpty({message: 'label is required'})
    @IsString({message: 'label must be a string'})
    @MaxLength(255, { message: 'label can\'t exceed 255 characters.' })
    label: string;

    @IsNotEmpty({message: 'companyName is required'})
    @IsString({message: 'companyName must be a string'})
    @MaxLength(255, { message: 'companyName can\'t exceed 255 characters.' })
    companyName: string;

    @IsOptional()
    @IsString({message: 'domain must be a string'})
    @MaxLength(255, { message: 'domain can\'t exceed 255 characters.' })
    domain?: string;

    @IsOptional()
    @IsString({message: 'description must be a string'})
    description: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date
    
}
