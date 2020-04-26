import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, RelationId, JoinColumn } from 'typeorm'
import { Transaction } from './transaction'
import { TransactionInstallmentConciliation } from './transaction-installment-conciliation'

@Entity()
export class TransactionInstallment {
    constructor(installmentNumber: number, value: number, transactionId: string) {
        this.transactionId = transactionId
        this.installmentNumber = installmentNumber
        this.value = value
    }

    @PrimaryColumn({ name: 'transaction_id', length: 37 })
    transactionId: string

    @PrimaryColumn('tinyint', { name: 'installment_number' })
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    value: number

    @ManyToOne(_ => Transaction, t => t.installments)
    @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
    transaction: Transaction

    @OneToOne(_ => TransactionInstallmentConciliation, c => c.installment, { nullable: true })
    conciliation?: TransactionInstallmentConciliation
}