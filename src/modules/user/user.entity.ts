import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar',unique: true, length: 20, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;
}