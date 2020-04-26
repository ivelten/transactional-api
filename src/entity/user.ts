import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeInsert, OneToMany } from 'typeorm'
import { Transaction } from './transaction'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    firstName: string

    @Column({ length: 50 })
    lastName: string
    
    @Column({ length: 100 })
    @Unique(['userName'])
    userName: string

    @Column({ length: '254' })
    @Unique(['email'])
    email: string
    
    @Column({ length: 60 })
    passwordHash: string

    @OneToMany(_ => Transaction, t => t.merchant)
    transactions: Transaction[]

    @Column('decimal', { precision: 5, scale: 2 })
    baseTax: number
}