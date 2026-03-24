import {
  Entity,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryColumn,
    BeforeInsert,
    OneToOne,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { v7 as uuidv7 } from 'uuid';
import { UserContext } from '../user-contexts/entities/user-context.entity';
import { Degree } from '../degrees/entities/degree.entity';
import { Experience } from '../experiences/entities/experience.entity';

@Entity('users')
export class User {
    
    // Postgre 18+
    // @PrimaryColumn({ 
    //     type: "uuid", 
    //     default: () => "uuidv7()"
    // })
    // id: string;

    // Keep DB compatibility with existing SQLite schema column `user_id`.
    @PrimaryColumn('uuid', { name: 'user_id' })
    id: string

    @BeforeInsert()
    assignId() {
        if (!this.id) {
            this.id = uuidv7()
        }
    }

    @Column({ length: 50, nullable: true })
    firstName: string;

    @Column({ length: 50, nullable: true })
    lastName: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ unique: true, nullable: true })
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'varchar', nullable: true })
    currentHashedRefreshToken: string | null;

    // Un User -> Plusieurs Companies
    @OneToMany(() => Company, (company) => company.user)
    companies: Company[];

    @OneToMany(() => Degree, (degree) => degree.user)
    degrees: Degree[];
    
    @OneToMany(() => Experience, (experience) => experience.user)
    experiences: Experience[];

    @OneToOne(() => UserContext, (context) => context.user)
    context: UserContext;
}