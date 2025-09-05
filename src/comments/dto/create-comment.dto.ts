import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({
        example: 'Informative Post',
        description: 'This is the comment body'
    })
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: '1',
        description: 'This is the id of the post to comment on'
    })
    @IsNotEmpty()
    postId: number;
}