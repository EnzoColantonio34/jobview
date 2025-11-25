import { Type } from 'class-transformer';
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
    IsPhoneNumber,
    IsDate,
    IsNumber,
} from 'class-validator';
  
export class CreateCompanyDto {
    @IsNotEmpty({message: 'name is required'})
    @IsString({message: 'name must be a string'})
    @MaxLength(50, { message: 'name can\'t exceed 50 characters.' })
    name: string;

    @IsOptional()
    @IsString({message: 'city must be a string'})
    @MaxLength(50, { message: 'city can\'t exceed 50 characters.' })
    city?: string;

    @IsOptional()
    @IsString({message: 'zipCode must be a string'})
    @MaxLength(50, { message: 'zipCode can\'t exceed 50 characters.' })
    zipCode?: string;

    @IsOptional()
    @IsString({message: 'address must be a string'})
    @MaxLength(50, { message: 'address can\'t exceed 50 characters.' })
    address?: string;

    @IsOptional()
    @IsString({message: 'addressExtra must be a string'})
    @MaxLength(50, { message: 'addressExtra can\'t exceed 50 characters.' })
    addressExtra?: string;

    @IsOptional()
    @IsString({message: 'email must be a string'})
    @IsEmail({}, { message: 'invalid email.' })
    @MaxLength(100, { message: 'email can\'t exceed 100 characters.' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    @IsPhoneNumber( 'FR', { message: 'Phone number must a valid french phone number' })
    phoneNumber?: string;

    // @IsEnum(UserRole, { message: 'role must be one of: admin, free, or premium' })
    // role: UserRole;
}