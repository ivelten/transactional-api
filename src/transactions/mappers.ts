import { IProcessedTransactionInstallmentModel, IProcessedTransactionResponseModel, IAuthorizeTransactionRequestModel, IProcessedTransactionInstallmentConciliationModel, IProcessedTransactionConciliationModel } from './models'
import { Transaction } from '../entity/transaction'
import { TransactionInstallment } from '../entity/transaction-installment'
import { mapper } from '../di'
import { v4 as uuidv4 } from 'uuid'
import { TransactionInstallmentConciliation } from '../entity/transaction-installment-conciliation'
import { TransactionConciliation } from '../entity/transaction-conciliation'

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

export const mapTransactionInstallmentConciliationToTransactionInstallmentConciliationResponse =
    mapper (async (installmentConciliation: TransactionInstallmentConciliation): Promise<IProcessedTransactionInstallmentConciliationModel> => {
        return {
            netValue: installmentConciliation.netValue,
            paymentDate: installmentConciliation.paymentDate
        }    
})

export const mapTransactionInstallmentToProcessedTransactionInstallmentResponse = 
    mapper(async (installment: TransactionInstallment): Promise<IProcessedTransactionInstallmentModel> => {
        return {
            installmentNumber: installment.installmentNumber,
            value: installment.value,
            conciliation: await mapTransactionInstallmentConciliationToTransactionInstallmentConciliationResponse(installment.conciliation)
        }
})

export const mapTransactionConciliationToTransactionConciliationResponse =
    mapper (async (transactionConciliation: TransactionConciliation): Promise<IProcessedTransactionConciliationModel> => {
        return {
            baseTax: transactionConciliation.baseTax
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
            value: transaction.value,
            conciliation: await mapTransactionConciliationToTransactionConciliationResponse(transaction.conciliation)
        }
})