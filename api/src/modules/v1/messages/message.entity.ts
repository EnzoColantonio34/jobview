import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Chat } from "../chat/chat.entity";

@Entity('messages')
export class Message {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    role: 'system' | 'human' | 'ai';

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;
}