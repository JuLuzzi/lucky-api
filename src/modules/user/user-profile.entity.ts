import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../address/address.entity';
import { User } from './user.entity';

@Entity('profiles')
export class UserProfile extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => User, {
        cascade: true,
        nullable: false,
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(type => Address, {
        cascade: true,
        nullable: false,
        eager: true,
    })
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column({ type: 'varchar', nullable: false })
    name: string;

}