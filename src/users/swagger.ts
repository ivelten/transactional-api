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
        password: { type: 'string' }
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
    tags: ['Users'],
    operationId: 'getUsers',
    parameters: [
        {
            name: 'offset',
            in: 'query',
            description: 'Number of items to skip',
            required: false,
            schema: { type: 'integer' }
        },
        {
            name: 'limit',
            in: 'query',
            description: 'Number of items to get',
            required: false,
            schema: { type: 'integer' }
        }
    ],
    responses: {
        '200': {
            description: 'Gets all users from the system.',
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
    tags: ['Users'],
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
            description: 'Gets a specific user from the system by its ID.',
            content: {
                'application/json': {
                    schema: userResponseSchema
                }
            }
        }
    }
}

export const postUser = {
    tags: ['Users'],
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
            description: 'User created.',
            content: {
                'application/json': {
                    schema: userResponseSchema
                }
            }
        }
    }
}