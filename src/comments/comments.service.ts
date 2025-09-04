import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/Entity/post.entity';
import { Comment } from './Entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,

        @InjectRepository(Post)
        private postRepo: Repository<Post>
    ) {}

    async createComment(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
        const post = await this.postRepo.findOne({where: {id: createCommentDto.postId}})
        
        if(!post) {
            throw new NotFoundException('Post not found');
        }

        const comment = this.commentRepo.create({
            content: createCommentDto.content,
            post,
            author: user
        });

        return this.commentRepo.save(comment);
    }

    async findCommentsByPost(postId: number): Promise<Comment[]> {
        const allComments = await this.commentRepo.find({
            where: {post: {id: postId}},
            relations: ['author'],
            order: {createdAt: 'ASC'}
        });

        if(allComments.length === 0) {
            throw new NotFoundException('No comment found on the given post.');
        }
        
        return allComments;
    }
}
