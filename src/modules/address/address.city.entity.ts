import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './address.country.entity';

@Entity('cities')
export class City extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => Country, {
        cascade: true,
        nullable: false,
        eager: true,
    })
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @Column({ type: 'varchar', nullable: false })
    name: string;
}