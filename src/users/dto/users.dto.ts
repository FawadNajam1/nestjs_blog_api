import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersDto {
    @ApiProperty({
        example: 'username@gmail.com',
        description: 'This is the email id of the user'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'This is the password of the user'
    })
    @IsNotEmpty()
    password: string;
}