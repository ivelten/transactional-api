import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
export class CreditCard {
    @PrimaryGeneratedColumn()
    id: number

    @Unique([ 'number' ])
    @Column({ length: 16 })
    number: string

    @Column('decimal', { precision: 13, scale: 2 })
    limit: number

    @Column('decimal', { precision: 13, scale: 2 })
    balance: number

    @Column()
    active: boolean
}