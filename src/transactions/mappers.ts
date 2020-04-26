import { IProcessedTransactionInstallmentModel, IProcessedTransactionResponseModel } from './models'
import { Transaction } from '../entity/transaction'
import { TransactionInstallment } from '../entity/transaction-installment'
import { mapper } from '../di'

export const mapTransactionInstallmentToProcessedTransactionInstallmentResponse = 
    mapper(async (installment: TransactionInstallment): Promise<IProcessedTransactionInstallmentModel> => {
        return {
            installmentNumber: installment.installmentNumber,
            value: installment.value
        }
})

export const mapTransactionToProcessedTransactionResponse = 
    mapper(async (transaction: Transaction): Promise<IProcessedTransactionResponseModel> => {
        const installments = 
            await Promise.all(transaction.installments.map(async (installment) => 
                await mapTransactionInstallmentToProcessedTransactionInstallmentResponse(installment)))

        return {
            creditCardNumber: transaction.creditCardNumber,
            installments: installments,
            transactionId: transaction.id,
            usdValue: transaction.usdValue,
            value: transaction.value,
        }
})