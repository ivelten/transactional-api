import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { TransactionInstallment } from './transaction-installment'
import { TransactionConciliation } from './transaction-conciliation'
import Decimal from 'decimal.js'

@Entity()
export class Transaction {
    @PrimaryColumn({ length: 32 })
    id: string

    @Column('timestamp')
    transactionDate: Date

    @Column('timestamp', { nullable: true })
    captureDate: Date

    @Column({ length: 100, nullable: true })
    invoiceNumber: string

    @Column({ length: 100, nullable: true })
    customerName: string

    @Column({ length: 15, nullable: true })
    customerDocument: string

    @Column({ length: 16 })
    creditCardNumber: string

    @Column('decimal', { precision: 13, scale: 2 })
    value: Decimal

    @Column('decimal', { precision: 13, scale: 2 })
    usdValue: Decimal

    @OneToMany(_ => TransactionInstallment, i => i.transaction)
    installments: TransactionInstallment[]

    @OneToOne(_ => TransactionConciliation, c => c.transaction, { nullable: true })
    conciliation?: TransactionConciliation
}