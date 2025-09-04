import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './Entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

    createPost(title: string, content: string, author: any) {
        const post = this.repo.create({title, content, author});
        return this.repo.save(post);
    }

    findAll() {
        return this.repo.find({relations: ['author']});
    }

    async findById(id: number) {
        const post = await this.repo.findOne({where: {id}, relations: ['author']});

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

        await this.repo.remove(post);
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

        const data = this.repo.merge(post, body);
        const updatedPost = await this.repo.save(data);

        return {
            message: "Post updated successfully."
        }
    }
}
