import {
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert,
    JoinColumn,
    RelationId,
    OneToOne,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from '../../users/user.entity';

@Entity('user_contexts')
export class UserContext {

    @PrimaryColumn('uuid')
    id: string

    @BeforeInsert()
    assignId() {
        if (!this.id) {
            this.id = uuidv7()
        }
    }

    @OneToOne(() => User, (user) => user.context, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @RelationId((context: UserContext) => context.user) 
    userId: string;

    @Column({ length: 255 })
    industry: string;

    @Column({ length: 255 })
    degree: string;

    @Column({ length: 50 })
    experienceYears: string;

    @Column({ type: 'text' })
    careerSummary: string;

    @Column({ length: 255 })
    location: string;

    @Column({ length: 255 })
    mobilityType: string;

    @Column({ type: 'text', nullable: true })
    specialSituationNote: string;
    
}