import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './Entity/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepo: Repository<Post>,

        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async createPost(title: string, content: string, authorId: number) {
        const author = await this.userRepo.findOne({ where: {id: authorId} });
        if (!author) {
        throw new NotFoundException('Author not found');
    }
        const post = this.postRepo.create({title, content, author});
        const savedPost = await this.postRepo.save(post);
        return {
            message: "Post Created Successfully.",
            data: savedPost
        };
    }

    async findAll() {
        return await this.postRepo.find({relations: ['author']});
    }

    async findById(id: number) {
        const post = await this.postRepo.findOne({where: {id}, relations: ['author']});

        if(!post) {
            throw new NotFoundException('No post found against the given id.');
        }

        return post;
    }

    async remove(postId: number, requestingUserId: number) {
        const post = await this.findById(postId);
        
        if(!post) {
            throw new NotFoundException('Post not found.');
        }

        if(post.author.id !== requestingUserId) {
            throw new ForbiddenException('You are not allowed to delete this post');
        }

        await this.postRepo.remove(post);
        return {
            message: "Post deleted successfully."
        }
    }

    async update(postId: number, userId: number, body: any) {
        const post = await this.findById(postId);

        if(!post) {
            throw new NotFoundException('Post Not Found.');
        }

        if(post.author.id !== userId) {
            throw new ForbiddenException('You are not allowed to update this post.');
        }

        const data = this.postRepo.merge(post, body);
        const updatedPost = await this.postRepo.save(data);

        return {
            message: "Post updated successfully.",
            data: updatedPost
        }
    }
}
