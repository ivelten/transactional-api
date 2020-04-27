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
        value: { type: 'number' }
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
        }
    }
}

export const authorizeTransaction = {
    tags: ['Transactions'],
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
            description: 'Transaction authorized.',
            content: {
                'application/json': {
                    schema: authorizedTransactionSchema
                }
            }
        }
    }
}