import { swaggerPaginationParameters } from '../di'

const userResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        userName: { type: 'string' },
        email: { type: 'string' }
    }
}

const createUserSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        userName: { type: 'string' },
        email: { type: 'string' },
        baseTax: { type: 'number' },
        password: { type: 'string', format: 'password' }
    },
    required: [
        'firstName',
        'lastName',
        'userName',
        'email',
        'password'
    ]
}

export const getUsers = {
    tags: [ 'Users' ],
    operationId: 'getUsers',
    parameters: swaggerPaginationParameters,
    responses: {
        '200': {
            description: 'Users listed',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: userResponseSchema
                    }
                }
            }
        }
    }
}

export const getUser = {
    tags: [ 'Users' ],
    operationId: 'getUser',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'The ID of the User to retrieve',
            required: true,
            schema: { type: 'integer' }
        }
    ],
    responses: {
        '200': {
            description: 'User retrieved',
            content: {
                'application/json': {
                    schema: userResponseSchema
                }
            }
        }
    }
}

export const postUser = {
    tags: [ 'Users' ],
    operationId: 'postUser',
    requestBody: {
        content: {
            'application/json': {
                schema: createUserSchema
            }
        }
    },
    responses: {
        '200': {
            description: 'User created',
            content: {
                'application/json': {
                    schema: userResponseSchema
                }
            }
        }
    }
}