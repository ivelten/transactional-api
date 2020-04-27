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

    @PrimaryColumn({ name: 'transaction_id', length: 37 })
    transactionId: string

    @PrimaryColumn('tinyint', { name: 'installment_number' })
    installmentNumber: number

    @Column('decimal', { name: 'net_value', precision: 13, scale: 2 })
    netValue: number

    @Column('date', { name: 'payment_date' })
    paymentDate: Date

    @OneToOne(_ => TransactionInstallment, i => i.conciliation)
    @JoinColumn([
        { name: 'transaction_id', referencedColumnName: 'transactionId' },
        { name: 'installment_number', referencedColumnName: 'installmentNumber' }
    ])
    installment: TransactionInstallment
}