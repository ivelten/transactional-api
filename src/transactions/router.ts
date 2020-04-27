import express, { Request, Response } from 'express'
import { processRequest, getUsdValue } from '../di'
import { getAll, get, authorize } from './services'
import { getTransactions, getTransaction, saveTransaction, subtractValueFromCreditCardBalance, getMerchantBaseTax, saveTransactionInstallments, saveTransactionConciliation, saveTransactionInstallmentsConciliation } from './storage'
import { mapTransactionToProcessedTransactionResponse, mapAuthorizeTransactionRequestToTransaction } from './mappers'
import { sendResponseModel } from '../express-tools'
import { validateAuthorizeTransactionRequestModel } from './validators'

const transactionsRouter = express.Router()

transactionsRouter.get('/', async (req: Request, res: Response) => {
    processRequest(res, async() => {
        const merchantId: number = parseInt(req.query.merchantId as string, 10)
        const offset: number = parseInt(req.query.offset as string, 10)
        const limit: number = parseInt(req.query.limit as string, 10)
        const getTransactionsOfMerchant = getTransactions(merchantId)
        const response = await getAll(offset, limit, getTransactionsOfMerchant, mapTransactionToProcessedTransactionResponse)
        sendResponseModel(response, res)
    })
})

transactionsRouter.get('/:id', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = req.params.id
        const response = await get(id, getTransaction, mapTransactionToProcessedTransactionResponse)
        sendResponseModel(response, res)
    })
})

transactionsRouter.post('/', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const mapRequest = mapAuthorizeTransactionRequestToTransaction(getUsdValue)
        const response = await authorize(
            req.body,
            validateAuthorizeTransactionRequestModel,
            subtractValueFromCreditCardBalance,
            mapRequest,
            saveTransaction,
            saveTransactionInstallments,
            getMerchantBaseTax,
            saveTransactionConciliation,
            saveTransactionInstallmentsConciliation,
            mapTransactionToProcessedTransactionResponse)
        sendResponseModel(response, res)
    })
})

export { transactionsRouter }