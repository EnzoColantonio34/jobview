import { UserResponseDto } from "./response-user.dto";

export class AuthResponseDto {
    message: string;
    access_token: string;
    refresh_token: string;
    user: UserResponseDto;
}