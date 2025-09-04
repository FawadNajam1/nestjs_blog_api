import { User } from "src/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export type LikeableType = 'Post' | 'Comment';

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    likeableId: number;

    @Column()
    likeableType: LikeableType;

    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}