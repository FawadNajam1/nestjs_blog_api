import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}