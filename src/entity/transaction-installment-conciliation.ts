import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, RelationId } from 'typeorm'
import Decimal from 'decimal.js'
import { TransactionInstallment } from './transaction-installment'

@Entity()
export class TransactionInstallmentConciliation {
    @PrimaryColumn({ length: 32 })
    @RelationId((self: TransactionInstallmentConciliation) => self.installment)
    transactionId: string

    @PrimaryColumn('tinyint')
    @RelationId((self: TransactionInstallmentConciliation) => self.installment)
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    netValue: Decimal

    @Column('timestamp')
    paymentDate: Date

    @OneToOne(_ => TransactionInstallment, i => i.conciliation)
    @JoinColumn()
    installment: TransactionInstallment
}