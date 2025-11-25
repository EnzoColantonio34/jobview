import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity('users')
export class User {
    // Default nullable: false
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

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