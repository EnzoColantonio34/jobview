import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SendMessageDto {
    @IsString({ message: 'message must be a string' })
    @IsNotEmpty({ message: 'message is required' })
    @MaxLength(2000, { message: 'message ne peut pas dépasser 2000 caractères.' })
    message: string;
}
