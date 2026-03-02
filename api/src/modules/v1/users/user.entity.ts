import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryColumn,
    BeforeInsert,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { v7 as uuidv7 } from 'uuid';

@Entity('users')
export class User {
    
    // Postgre 18+
    // @PrimaryColumn({ 
    //     type: "uuid", 
    //     default: () => "uuidv7()"
    // })
    // id: string;

    @PrimaryColumn('uuid')
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
}