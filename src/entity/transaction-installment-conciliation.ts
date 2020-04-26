import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, RelationId } from 'typeorm'
import { TransactionInstallment } from './transaction-installment'

@Entity()
export class TransactionInstallmentConciliation {
    constructor(transactionId: string, installmentNumber: number, netValue: number, paymentDate: Date) {
        this.transactionId = transactionId
        this.installmentNumber = installmentNumber
        this.netValue = netValue
        this.paymentDate = paymentDate
    }

    @PrimaryColumn({ length: 37 })
    @RelationId((self: TransactionInstallmentConciliation) => self.installment)
    transactionId: string

    @PrimaryColumn('tinyint')
    @RelationId((self: TransactionInstallmentConciliation) => self.installment)
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    netValue: number

    @Column('timestamp')
    paymentDate: Date

    @OneToOne(_ => TransactionInstallment, i => i.conciliation)
    @JoinColumn()
    installment: TransactionInstallment
}