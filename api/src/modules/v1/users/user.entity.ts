import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { v7 as uuidv7 } from 'uuid';

@Entity('users')
export class User {
    
    @PrimaryColumn('varchar', { length: 36 }) 
    userId: string = uuidv7();

    @Column({ length: 50, nullable: true })
    firstName: string;

    @Column({ length: 50, nullable: true })
    lastName: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 50 })
    password: string;

    @Column({ nullable: false })
    birthDate: Date;

    @Column({ unique: true })
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'varchar', nullable: true })
    currentHashedRefreshToken: string | null;

    // Un User -> Plusieurs Companies
    @OneToMany(() => Company, (company) => company.user)
    companies: Company[];
}