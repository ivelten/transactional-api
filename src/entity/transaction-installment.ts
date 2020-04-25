import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, RelationId } from 'typeorm'
import { Decimal } from 'decimal.js'
import { Transaction } from './transaction'
import { TransactionInstallmentConciliation } from './transaction-installment-conciliation'

@Entity()
export class TransactionInstallment {
    @PrimaryColumn({ length: 32 })
    @RelationId((self: TransactionInstallment) => self.transaction)
    transactionId: string

    @PrimaryColumn('tinyint')
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    value: Decimal

    @ManyToOne(_ => Transaction, t => t.installments)
    transaction: Transaction

    @OneToOne(_ => TransactionInstallmentConciliation, c => c.installment, { nullable: true })
    conciliation?: TransactionInstallmentConciliation
}