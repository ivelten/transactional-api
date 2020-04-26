import { paginateWithDefaults } from '../di'
import { getConnection } from 'typeorm'
import { Transaction } from '../entity/transaction'
import { CreditCard } from '../entity/credit-card'
import { TransactionConciliation } from '../entity/transaction-conciliation'
import { User } from '../entity/user'
import { TransactionInstallment } from '../entity/transaction-installment'

export const saveTransaction = async (transaction: Transaction): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).save(transaction)
}

export const getTransactions = paginateWithDefaults(async (offset: number, limit: number): Promise<Transaction[]> => {
    return await getConnection().getRepository(Transaction).find({ take: limit, skip: offset, relations: [ 'installments' ] })
})

export const getTransaction = async (id: string): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).findOne(id)
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

export const conciliateTransaction = async (transactionId: string, baseTax: number): Promise<void> => {
    const connection = getConnection()
    let conciliation = new TransactionConciliation(transactionId, baseTax)
    conciliation = await connection.getRepository(TransactionConciliation).save(conciliation)
    const transactions = await connection.getRepository(TransactionInstallment)
}