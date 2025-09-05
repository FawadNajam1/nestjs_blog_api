import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entity/like.entity';
import { User } from 'src/users/entity/user.entity';
import { Post } from 'src/posts/Entity/post.entity';
import { Comment } from 'src/comments/Entity/comment.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private likesRepo: Repository<Like>,

        @InjectRepository(Post)
        private postsRepo: Repository<Post>,

        @InjectRepository(Comment)
        private commentsRepo: Repository<Comment>
    ) {}

    async likePost(id: number, user: any)  {
        const post = await this.postsRepo.findOneBy({id});
        if(!post) {
            throw new NotFoundException(`Post with id: ${id} not found.`)
        }

        const like = this.likesRepo.create({
            user: {id: user.sub},
            likeableId: id,
            likeableType: 'Post'
        });

        const savedLike = await this.likesRepo.save(like);

        return {
            message: "Post Liked Successfully.",
            data: savedLike
        };
    }

    async likeComment(id: number, user: any) {
        const comment = await this.commentsRepo.findOneBy({id});
        if(!comment) {
            throw new NotFoundException(`Comment with id: ${id} not found.`);
        }

        const like = this.likesRepo.create({
            user: {id: user.sub},
            likeableId: id,
            likeableType: 'Comment'
        });

        const likedComment = await this.likesRepo.save(like);

        return {
            message: 'Comment Liked Successfully.',
            data: likedComment
        }
    }
}
