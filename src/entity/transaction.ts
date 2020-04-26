import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { TransactionInstallment } from './transaction-installment'
import { TransactionConciliation } from './transaction-conciliation'
import Decimal from 'decimal.js'

const buildInstallments = (transaction: Transaction, installmentCount: number): TransactionInstallment[] => {
    const otherInstallmentsValue = Decimal.div(transaction.value, installmentCount).toDecimalPlaces(2)
    const remainingValue = Decimal.mul(otherInstallmentsValue, installmentCount - 1)
    const firstInstallmentValue = Decimal.sub(transaction.value, remainingValue)
    const installments: TransactionInstallment[] = [ new TransactionInstallment(1, firstInstallmentValue.toNumber(), transaction) ]

    for (var i = 2; i <= installmentCount; i++)
        installments.push(new TransactionInstallment(i, otherInstallmentsValue.toNumber(), transaction))

    return installments
}

@Entity()
export class Transaction {
    constructor(
        id: string,
        authorizationDate: Date,
        creditCardNumber: string,
        value: number,
        usdValue: number,
        installmentCount?: number,
        invoiceNumber?: string,
        customerName?: string,
        customerDocument?: string) {
            this.id = id
            this.authorizationDate = authorizationDate
            this.creditCardNumber = creditCardNumber
            this.value = value
            this.usdValue = usdValue
            this.invoiceNumber = invoiceNumber
            this.customerName = customerName
            this.customerDocument = customerDocument
            if (installmentCount) this.installments = buildInstallments(this, installmentCount)
    }

    @PrimaryColumn({ length: 37 })
    id: string

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
}