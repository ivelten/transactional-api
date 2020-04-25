import { Entity, PrimaryColumn, OneToOne, Column, PrimaryGeneratedColumn, JoinColumn, RelationId } from 'typeorm'
import { Transaction } from './transaction'
import Decimal from 'decimal.js'

@Entity()
export class TransactionConciliation {
    @PrimaryColumn({ length: 32 })
    @RelationId((self: TransactionConciliation) => self.transaction)
    transactionId: string

    @Column('decimal', { precision: 5, scale: 2 })
    baseTax: Decimal

    @OneToOne(_ => Transaction, t => t.conciliation)
    @JoinColumn()
    transaction: Transaction
}