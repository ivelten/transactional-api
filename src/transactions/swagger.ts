import { swaggerPaginationParameters } from '../di'

const paymentSchema = {
    type: 'object',
    properties: {
        creditCardNumber: { type: 'string' },
        value: { type: 'number' },
        installmentCount: { type: 'integer' }
    },
    required: [
        'creditCardNumber',
        'value'
    ]
}

const authorizeTransactionSchema = {
    type: 'object',
    properties: {
        merchantId: { type: 'integer' },
        customerName: { type: 'string' },
        invoiceNumber: { type: 'string' },
        customerDocument: { type: 'string' },
        payment: paymentSchema
    },
    required: [
        'merchantId',
        'payment'
    ]
}

const authorizedTransactionInstallmentSchema = {
    type: 'object',
    properties: {
        installmentNumber: { type: 'integer' },
        value: { type: 'number' },
        conciliation: {
            type: 'object',
            properties: {
                netValue: { type: 'number' },
                paymentDate: { type: 'string', format: 'date' }
            }
        }
    }
}

const authorizedTransactionSchema = {
    type: 'object',
    properties: {
        transactionId: { type: 'string' },
        value: { type: 'number' },
        usdValue: { type: 'number' },
        customerName: { type: 'string' },
        invoiceNumber: { type: 'string' },
        customerDocument: { type: 'string' },
        creditCardNumber: { type: 'string' },
        authorizationDate: { type: 'string', format: 'date-time' },
        installments: {
            type: 'array',
            items: authorizedTransactionInstallmentSchema
        },
        conciliation: {
            type: 'object',
            properties: {
                baseTax: { type: 'number' }
            }
        }
    }
}

export const getTransactions = {
    tags: [ 'Transactions' ],
    operationId: 'getTransactions',
    parameters: [ 
        ...swaggerPaginationParameters,
        {
            name: 'merchantId',
            in: 'query',
            description: 'The user ID of the User merchant',
            required: true,
            schema: { type: 'integer' }
        }
    ],
    responses: {
        '200': {
            description: 'Transactions listed',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: authorizedTransactionSchema
                    }
                }
            }
        }
    }
}

export const getTransaction = {
    tags: [ 'Transactions' ],
    operationId: 'getTransaction',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'The ID of the transaction to retrieve',
            required: true,
            schema: { type: 'string' }
        }
    ],
    responses: {
        '200': {
            description: 'Transaction retrieved',
            content: {
                'application/json': {
                    schema: authorizedTransactionSchema
                }
            }
        }
    }
}

export const authorizeTransaction = {
    tags: [ 'Transactions' ],
    operationId: 'authorizeTransaction',
    requestBody: {
        content: {
            'application/json': {
                schema: authorizeTransactionSchema
            }
        }
    },
    responses: {
        '200': {
            description: 'Transaction authorized',
            content: {
                'application/json': {
                    schema: authorizedTransactionSchema
                }
            }
        }
    }
}