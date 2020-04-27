import { paginateWithDefaults } from '../di'
import { getConnection } from 'typeorm'
import { Transaction } from '../entity/transaction'
import { CreditCard } from '../entity/credit-card'
import { TransactionConciliation } from '../entity/transaction-conciliation'
import { User } from '../entity/user'
import { TransactionInstallment } from '../entity/transaction-installment'
import { TransactionInstallmentConciliation } from '../entity/transaction-installment-conciliation'

export const saveTransaction = async (transaction: Transaction): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).save(transaction)
}

export const getTransactions = (merchantId: number) => 
    paginateWithDefaults(async (offset: number, limit: number): Promise<Transaction[]> => {
        if (!merchantId) return undefined
        const connection = getConnection()
        const merchant = await connection.getRepository(User).findOne(merchantId)
        if (!merchant) return undefined
        return await connection.getRepository(Transaction).find({
            where: { merchantId: merchantId },
            take: limit,
            skip: offset,
            relations: [ 'installments' ]
        })
})

export const getTransaction = async (id: string): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).findOne(id, { relations: [ 'installments' ] })
}

export const subtractValueFromCreditCardBalance = async (value: number, creditCardNumber: string): Promise<void> => {
    const connection = getConnection()
    const creditCardRepository = connection.getRepository(CreditCard)
    const creditCard = await creditCardRepository.findOne({ number: creditCardNumber })
    creditCard.balance = creditCard.balance - value
    await creditCardRepository.save(creditCard)
}

export const saveTransactionInstallments = async (installments: TransactionInstallment[]): Promise<TransactionInstallment[]> => {
    return await getConnection().getRepository(TransactionInstallment).save(installments)
}

export const getMerchantBaseTax = async (merchantId: number): Promise<number> => {
    const merchant = await getConnection().getRepository(User).findOne(merchantId)
    if (!merchant) return undefined
    return merchant.baseTax
}

export const saveTransactionConciliation = async (transaction: TransactionConciliation): Promise<TransactionConciliation> => {
    return await getConnection().getRepository(TransactionConciliation).save(transaction)
}

export const saveTransactionInstallmentsConciliation = async (installments: TransactionInstallmentConciliation[]): Promise<TransactionInstallmentConciliation[]> => {
    return await getConnection().getRepository(TransactionInstallmentConciliation).save(installments)
}