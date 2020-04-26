import express, { Request, Response } from 'express'
import { processRequest } from '../di'
import { getAll, get } from './services'
import { getTransactions, getTransaction } from './storage'
import { mapTransactionToProcessedTransactionResponse } from './mappers'
import { sendResponseModel } from '../express-tools'

const transactionsRouter = express.Router()

transactionsRouter.get('/', async (req: Request, res: Response) => {
    processRequest(res, async() => {
        const offset: number = parseInt(req.query.offset as string, 10)
        const limit: number = parseInt(req.query.limit as string, 10)
        const response = await getAll(offset, limit, getTransactions, mapTransactionToProcessedTransactionResponse)
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

export { transactionsRouter }