import { Transaction } from '../entity/transaction'
import { IProcessedTransactionResponseModel, IAuthorizeTransactionRequestModel } from './models'
import { ValidationError } from 'class-validator'
import { makeResponseModel, ResponseModel } from '../models'
import { TransactionInstallment } from '../entity/transaction-installment'
import Decimal from 'decimal.js'

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

export const createTransactionInstallments = (transactionId: string, value: number, installmentCount: number): TransactionInstallment[] => {
    const otherInstallmentsValue = Decimal.div(value, installmentCount).toDecimalPlaces(2)
    const remainingValue = Decimal.mul(otherInstallmentsValue, installmentCount - 1)
    const firstInstallmentValue = Decimal.sub(value, remainingValue)
    
    const installments: TransactionInstallment[] = [ 
        new TransactionInstallment(1, firstInstallmentValue.toNumber(), transactionId)
    ]

    for (let i = 2; i <= installmentCount; i++)
        installments.push(new TransactionInstallment(i, otherInstallmentsValue.toNumber(), transactionId))

    return installments
}

export const authorize = async (
    request: IAuthorizeTransactionRequestModel,
    validateRequest: (request: IAuthorizeTransactionRequestModel) => Promise<ValidationError[]>,
    subtractValueFromCreditCardBalance: (value: number, creditCardNumber: string) => Promise<void>,
    mapRequestToTransaction: (request: IAuthorizeTransactionRequestModel) => Promise<Transaction>,
    saveTransaction: (transaction: Transaction) => Promise<Transaction>,
    saveTransactionInstallments: (installments: TransactionInstallment[]) => Promise<TransactionInstallment[]>,
    getMerchantBaseTax: (merchantId: number) => Promise<number>,
    conciliateTransaction: (transactionId: string, baseTax: number) => Promise<void>,
    mapTransactionToResponse: (transaction: Transaction) => Promise<IProcessedTransactionResponseModel>): Promise<ResponseModel<IProcessedTransactionResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            subtractValueFromCreditCardBalance(request.payment.value, request.payment.creditCardNumber)
            let transaction = await mapRequestToTransaction(request)
            transaction = await saveTransaction(transaction)
            let installments = createTransactionInstallments(transaction.id, request.payment.value, request.payment.installmentCount)
            installments = await saveTransactionInstallments(installments)
            transaction.installments = installments
            const baseTax = await getMerchantBaseTax(transaction.merchantId)
            await conciliateTransaction(transaction.id, baseTax)
            return await mapTransactionToResponse(transaction)
    })
}