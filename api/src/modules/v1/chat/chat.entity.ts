import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Message } from "../messages/message.entity";
import { User } from "../users/user.entity";

@Entity('chats')
export class Chat {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    jobTitle: string;

    @Column({ default: 'ongoing' }) // 'ongoing' | 'completed'
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.chat)
    user: User;

    @OneToMany(() => Message, (message) => message.chat, { cascade: true })
    messages: Message[];
}