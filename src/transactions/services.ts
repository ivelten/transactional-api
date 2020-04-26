import { Transaction } from '../entity/transaction'
import { IProcessedTransactionResponseModel, IAuthorizeTransactionRequestModel } from './models'
import { ValidationError } from 'class-validator'
import { makeResponseModel, ResponseModel } from '../models'

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

export const authorize = async (
    request: IAuthorizeTransactionRequestModel,
    validateRequest: (request: IAuthorizeTransactionRequestModel) => Promise<ValidationError[]>,
    subtractValueFromCreditCardBalance: (value: number, creditCardNumber: string) => Promise<void>,
    mapRequestToTransaction: (request: IAuthorizeTransactionRequestModel) => Promise<Transaction>,
    saveTransaction: (transaction: Transaction) => Promise<Transaction>,
    mapTransactionToResponse: (transaction: Transaction) => Promise<IProcessedTransactionResponseModel>): Promise<ResponseModel<IProcessedTransactionResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            subtractValueFromCreditCardBalance(request.payment.value, request.payment.creditCardNumber)
            var transaction = await mapRequestToTransaction(request)
            transaction = await saveTransaction(transaction)
            return await mapTransactionToResponse(transaction)
    })
}