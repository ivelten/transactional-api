import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { usersRouter } from './users/router'
import { transactionsRouter } from './transactions/router'

const createApp = (): Express => {
    const app = express()
    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use('/users', usersRouter)
    app.use('/transactions', transactionsRouter)
    return app
}

export { createApp }