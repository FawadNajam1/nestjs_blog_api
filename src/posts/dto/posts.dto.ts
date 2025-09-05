import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostsDto {
    @ApiProperty({
        example: 'My First Blog',
        description: 'This is the title of the blog post'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'This is the content of the blog post',
        description: 'Blog content'
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}