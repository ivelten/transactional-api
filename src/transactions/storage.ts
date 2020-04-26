import { paginateWithDefaults } from '../di'
import { getConnection } from 'typeorm'
import { Transaction } from '../entity/transaction'

export const getTransactions = paginateWithDefaults(async (offset: number, limit: number): Promise<Transaction[]> => {
    return await getConnection().getRepository(Transaction).find({ take: limit, skip: offset })
})

export const getTransaction = async (id: string): Promise<Transaction> => {
    return await getConnection().getRepository(Transaction).findOne(id)
}