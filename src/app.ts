import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { usersRouter } from './users/router'
import { transactionsRouter } from './transactions/router'
import { swaggerDocument } from './swagger'
import swaggerUi from 'swagger-ui-express'

const createApp = (): Express => {
    const app = express()
    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use('/users', usersRouter)
    app.use('/transactions', transactionsRouter)
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    return app
}

export { createApp }