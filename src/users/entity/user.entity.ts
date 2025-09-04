import { Exclude } from "class-transformer";
import { Comment } from "src/comments/Entity/comment.entity";
import { Like } from "src/likes/entity/like.entity";
import { Post } from "src/posts/Entity/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}