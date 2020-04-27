import { IProcessedTransactionInstallmentModel, IProcessedTransactionResponseModel, IAuthorizeTransactionRequestModel } from './models'
import { Transaction } from '../entity/transaction'
import { TransactionInstallment } from '../entity/transaction-installment'
import { mapper } from '../di'
import { v4 as uuidv4 } from 'uuid'

export const mapAuthorizeTransactionRequestToTransaction = (getUsdValue: (brlValue: number) => Promise<number>) =>
    mapper(async (request: IAuthorizeTransactionRequestModel): Promise<Transaction> => {
        const authorizationDate = new Date()
        const id = uuidv4()
        const usdValue = await getUsdValue(request.payment.value)
        return new Transaction(
            id,
            request.merchantId,
            authorizationDate,
            request.payment.creditCardNumber,
            request.payment.value,
            usdValue,
            request.invoiceNumber,
            request.customerName,
            request.customerDocument)
})


export const mapTransactionInstallmentToProcessedTransactionInstallmentResponse = 
    mapper(async (installment: TransactionInstallment): Promise<IProcessedTransactionInstallmentModel> => {
        return {
            installmentNumber: installment.installmentNumber,
            value: installment.value
        }
})

export const mapTransactionToProcessedTransactionResponse = 
    mapper(async (transaction: Transaction): Promise<IProcessedTransactionResponseModel> => {
        const installments = await Promise.all(transaction.installments.map(installment => 
                mapTransactionInstallmentToProcessedTransactionInstallmentResponse(installment)))
        return {
            creditCardNumber: transaction.creditCardNumber,
            installments: installments,
            transactionId: transaction.id,
            usdValue: transaction.usdValue,
            value: transaction.value
        }
})