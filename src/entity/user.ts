import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

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
}