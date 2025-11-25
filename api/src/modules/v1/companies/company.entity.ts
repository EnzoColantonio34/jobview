import {
  Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    RelationId,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('companies')
export class Company {
    // Default nullable: false
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

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

    // Plusieurs Companies -> Un User
    // onDelete: 'CASCADE' signifie que si on supprime l'User, 
    // ses entreprises sont supprimées automatiquement (optionnel mais recommandé ici).
    @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) // <--- Force le nom de la colonne pour coller à ton schéma DrawDB
    user: User;

    // Optionnel : Si tu veux accéder à l'ID directement sans charger toute la relation User
    // @Column({ nullable: true, insert: false, update: false })
    // userId: string;
    // @RelationId({ nullable: true, insert: false, update: false })
    // userId: string;

    @RelationId((company: Company) => company.user) 
    userId: string;


    // @CreateDateColumn()
    // createdAt: Date;

    // Relations
    // @OneToMany(() => Mood, (mood) => mood.user)
    // moods: Mood[];
}