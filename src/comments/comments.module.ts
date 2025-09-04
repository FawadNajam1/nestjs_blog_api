import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/Entity/post.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './Entity/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Post])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
