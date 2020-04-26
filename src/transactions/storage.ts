import { paginateWithDefaults } from '../di'
import { getConnection } from 'typeorm'
import { Transaction } from '../entity/transaction'
import { CreditCard } from '../entity/credit-card'

export const saveTransaction = async (transaction: Transaction): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).save(transaction)
}

export const getTransactions = paginateWithDefaults(async (offset: number, limit: number): Promise<Transaction[]> => {
    return await getConnection().getRepository(Transaction).find({ take: limit, skip: offset })
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