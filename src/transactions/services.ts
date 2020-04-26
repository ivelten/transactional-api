import { Transaction } from '../entity/transaction'
import { IProcessedTransactionResponseModel } from './models'

export const getAll = async (
    offset: number,
    limit: number,
    getTransactions: (offset: number, limit: number) => Promise<Transaction[]>,
    mapTransactionToResponse: (transaction: Transaction) => Promise<IProcessedTransactionResponseModel>): Promise<IProcessedTransactionResponseModel[]> => {
        const transactions = await getTransactions(offset, limit)
        const response = transactions.map(async (user) => await mapTransactionToResponse(user))
        return Promise.all(response)
}

export const get = async (
    id: string,
    getTransaction: (id: string) => Promise<Transaction>,
    mapTransactionToResponse: (transaction: Transaction) => Promise<IProcessedTransactionResponseModel>): Promise<IProcessedTransactionResponseModel> => {
        const user = await getTransaction(id)
        return await mapTransactionToResponse(user)
}