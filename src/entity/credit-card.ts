import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
import Decimal from 'decimal.js'

@Entity()
export class CreditCard {
    @PrimaryGeneratedColumn()
    id: number

    @Unique([ 'number' ])
    @Column({ length: 16 })
    number: string

    @Column('decimal', { precision: 13, scale: 2 })
    limit: Decimal

    @Column('decimal', { precision: 13, scale: 2 })
    balance: Decimal

    @Column()
    blocked: boolean
}