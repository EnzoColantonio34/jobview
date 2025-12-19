import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    RelationId,
    OneToMany,
    DeleteDateColumn,
    Unique,
    PrimaryColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Interview } from '../interviews/interview.entity';

@Entity('companies')
@Unique(['name', 'user'])
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, nullable: true })
    city: string;

    @Column({ length: 50, nullable: true })
    zipCode: string;

    @Column({ length: 50, nullable: true })
    address: string;

    @Column({ length: 50, nullable: true })
    addressExtra: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 50 })
    phoneNumber: string;

    @DeleteDateColumn()
    deletedAt: Date | null;

    // Plusieurs Companies -> Un User
    // onDelete: 'CASCADE' signifie que si on supprime l'User, 
    // ses entreprises sont supprimées automatiquement
    @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @RelationId((company: Company) => company.user) 
    userId: string;

    // Un User -> Plusieurs Interviews
    @OneToMany(() => Interview, (interview) => interview.company)
    interviews: Interview[];

}