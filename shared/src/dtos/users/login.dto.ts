import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString({message: 'usernameOrEmail must be a string'})
    @IsNotEmpty({message: 'username or email is required'})
    usernameOrEmail: string;

    @IsNotEmpty({ message: 'password is required' })
    @IsString({ message: 'password must be a string' })
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    @MaxLength(255, { message: 'Le mot de passe ne peut pas dépasser 255 caractères.' })
    password: string;
}