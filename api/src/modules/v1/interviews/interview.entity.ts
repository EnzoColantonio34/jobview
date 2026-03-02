import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    RelationId,
    PrimaryColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity('interviews')
export class Interview {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    label: string;

    @Column({ length: 50, nullable: true })
    state: string;

    @Column({ nullable: true })
    emailSentDate: Date;

    @Column({ nullable: true })
    interviewDate: Date;

    @Column({ nullable: true })
    remindDate: Date;

    // @ManyToOne(() => Company, (company) => company.interviews, { onDelete: 'CASCADE' })
    @ManyToOne(() => Company, (company) => company.interviews)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @RelationId((interview: Interview) => interview.company) 
    companyId: number;

}