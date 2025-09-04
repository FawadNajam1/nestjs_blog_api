import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { Post } from 'src/posts/Entity/post.entity';
import { Comment } from 'src/comments/Entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post, Comment])
  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
