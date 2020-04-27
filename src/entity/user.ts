import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeInsert, OneToMany } from 'typeorm'
import { Transaction } from './transaction'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'first_name', length: 50 })
    firstName: string

    @Column({ name: 'last_name', length: 50 })
    lastName: string
    
    @Column({ name: 'user_name', length: 100 })
    @Unique(['userName'])
    userName: string

    @Column({ length: '254' })
    @Unique(['email'])
    email: string
    
    @Column({ name: 'password_hash', length: 60 })
    passwordHash: string

    @OneToMany(_ => Transaction, t => t.merchant)
    transactions: Transaction[]

    @Column('decimal', { name: 'base_tax', precision: 5, scale: 2, default: 2.5 })
    baseTax: number
}