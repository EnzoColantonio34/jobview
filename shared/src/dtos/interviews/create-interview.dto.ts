import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    IsOptional,
    IsDate,
    IsNumber
} from 'class-validator';
  
export class CreateInterviewDto {
    @IsNotEmpty({ message: 'Label is required' })
    @IsString({message: 'label must be a string'})
    @MaxLength(50, { message: 'label can\'t exceed 50 characters.' })
    label: string;

    @IsOptional()
    @IsString({message: 'state must be a string'})
    @MaxLength(50, { message: 'state can\'t exceed 50 characters.' })
    state?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    emailSentDate?: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    interviewDate?: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    remindDate?: Date

    @IsNotEmpty()
    @IsNumber({}, { message: 'companyId must be a number' })
    companyId: number;
    
}