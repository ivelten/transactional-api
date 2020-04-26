import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, ManyToOne, RelationId } from 'typeorm'
import { TransactionInstallment } from './transaction-installment'
import { TransactionConciliation } from './transaction-conciliation'
import Decimal from 'decimal.js'
import { User } from './user'

@Entity()
export class Transaction {
    constructor(
        id: string,
        merchantId: number,
        authorizationDate: Date,
        creditCardNumber: string,
        value: number,
        usdValue: number,
        invoiceNumber?: string,
        customerName?: string,
        customerDocument?: string) {
            this.id = id
            this.merchantId = merchantId
            this.authorizationDate = authorizationDate
            this.creditCardNumber = creditCardNumber
            this.value = value
            this.usdValue = usdValue
            this.invoiceNumber = invoiceNumber
            this.customerName = customerName
            this.customerDocument = customerDocument
    }

    @PrimaryColumn({ length: 37 })
    id: string

    @Column()
    merchantId: number

    @Column('timestamp')
    authorizationDate: Date

    @Column({ length: 100, nullable: true })
    invoiceNumber: string

    @Column({ length: 100, nullable: true })
    customerName: string

    @Column({ length: 15, nullable: true })
    customerDocument: string

    @Column({ length: 16 })
    creditCardNumber: string

    @Column('decimal', { precision: 13, scale: 2 })
    value: number

    @Column('decimal', { precision: 13, scale: 2 })
    usdValue: number

    @OneToMany(_ => TransactionInstallment, i => i.transaction)
    installments: TransactionInstallment[]

    @OneToOne(_ => TransactionConciliation, c => c.transaction, { nullable: true })
    conciliation?: TransactionConciliation

    @ManyToOne(_ => User, u => u.transactions)
    merchant: User
}