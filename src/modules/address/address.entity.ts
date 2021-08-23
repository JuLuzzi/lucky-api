import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './address-city.entity';

@Entity('addresses')
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => City, {
        nullable: false,
        eager: true,
    })
    @JoinColumn({ name: 'city_id' })
    city: City;

    @Column({ type: 'varchar', nullable: false })
    street: string;
}