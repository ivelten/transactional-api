import { PORT } from './env'
import { getUsers, getUser, postUser } from './users/swagger'
import { authorizeTransaction, getTransactions, getTransaction } from './transactions/swagger'

export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Brydge Test API',
        description: 'An API made for simulate transactioning for Brydge.',
        contact: {
            name: 'Ismael Carlos Velten',
            email: 'ismaelcarlosvelten@gmail.com',
            url: 'blog.ismaelvelten.com'
        },
        license: {
            name: 'ISC',
            url: 'https://opensource.org/licenses/ISC'
        }
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Local server'
        }
    ],
    tags: [
        { name: 'Users' }
    ],
    paths: {
        "/users": {
            get: getUsers,
            post: postUser
        },
        "/users/{id}": {
            get: getUser
        },
        "/transactions": {
            get: getTransactions,
            post: authorizeTransaction
        },
        "/transactions/{id}": {
            get: getTransaction
        }
    }
}