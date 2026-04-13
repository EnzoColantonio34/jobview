import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class StartChatDto {
    @IsString({ message: 'jobTitle must be a string' })
    @IsNotEmpty({ message: 'jobTitle is required' })
    @MaxLength(120, { message: 'jobTitle ne peut pas dépasser 120 caractères.' })
    jobTitle: string;
}
