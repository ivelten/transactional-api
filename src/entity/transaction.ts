import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { TransactionInstallment } from './transaction-installment'
import { TransactionConciliation } from './transaction-conciliation'

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

    @OneToMany(_ => TransactionInstallment, i => i.transaction)
    installments: TransactionInstallment[]

    @OneToOne(_ => TransactionConciliation, c => c.transaction, { nullable: true })
    conciliation?: TransactionConciliation
}