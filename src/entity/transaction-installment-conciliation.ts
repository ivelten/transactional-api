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
    transactionId: string

    @PrimaryColumn('tinyint')
    installmentNumber: number

    @Column('decimal', { precision: 13, scale: 2 })
    netValue: number

    @Column('timestamp')
    paymentDate: Date

    @OneToOne(_ => TransactionInstallment, i => i.conciliation)
    @JoinColumn([
        { name: 'transaction_id', referencedColumnName: 'transactionId' },
        { name: 'installment_number', referencedColumnName: 'installmentNumber' }
    ])
    installment: TransactionInstallment
}