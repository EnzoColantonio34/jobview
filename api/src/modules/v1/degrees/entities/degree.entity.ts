import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    RelationId,
} from 'typeorm';
import { Company } from '../../companies/company.entity';
import { User } from '../../users/user.entity';

@Entity('degrees')
export class Degree {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255, unique: true })
    label: string;

    @Column({ length: 255, nullable: true })
    level: string;

    @Column({ length: 255, nullable: true })
    domain: string;

    @Column({ nullable: false })
    startDate: Date;

    @Column({ nullable: false })
    endDate: Date;

    @Column('text', { nullable: true })
    description: string;

    @Column({ nullable: false })
    isObtained: boolean;

    @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @RelationId((company: Company) => company.user) 
    userId: string;
}