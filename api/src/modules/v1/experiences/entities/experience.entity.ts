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

@Entity('experiences')
export class Experience {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    label: string;

    @Column({ length: 255 })
    companyName: string;

    @Column({ length: 255, nullable: true })
    domain: string;

    @Column('text', { nullable: true })
    description: string;   

    @Column({ nullable: false })
    startDate: Date;

    @Column({ nullable: false })
    endDate: Date;

    @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @RelationId((company: Company) => company.user) 
    userId: string;
}