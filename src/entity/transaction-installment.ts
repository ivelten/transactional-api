import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, RelationId } from 'typeorm'
import { Transaction } from './transaction'
import { TransactionInstallmentConciliation } from './transaction-installment-conciliation'

@Entity()
export class TransactionInstallment {
    constructor(installmentNumber: number, value: number, transaction: Transaction) {
        if (transaction) {
            this.transactionId = transaction.id
            this.installmentNumber = installmentNumber
            this.value = value
        }
    }

    @PrimaryColumn({ length: 37 })
    @RelationId((self: TransactionInstallment) => self.transaction)
    transactionId: string

    @PrimaryColumn('tinyint')
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    value: number

    @ManyToOne(_ => Transaction, t => t.installments)
    transaction: Transaction

    @OneToOne(_ => TransactionInstallmentConciliation, c => c.installment, { nullable: true })
    conciliation?: TransactionInstallmentConciliation
}