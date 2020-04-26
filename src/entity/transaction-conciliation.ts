import { Entity, PrimaryColumn, OneToOne, Column, PrimaryGeneratedColumn, JoinColumn, RelationId } from 'typeorm'
import { Transaction } from './transaction'

@Entity()
export class TransactionConciliation {
    @PrimaryColumn({ length: 37 })
    @RelationId((self: TransactionConciliation) => self.transaction)
    transactionId: string

    @Column('decimal', { precision: 5, scale: 2 })
    baseTax: number

    @OneToOne(_ => Transaction, t => t.conciliation)
    @JoinColumn()
    transaction: Transaction
}