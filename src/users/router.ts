import express, { Request, Response } from 'express'
import { create, getAll, get } from './services'
import { mapCreateUserRequestToUser, mapUserToCreateUserResponse, mapUserToGetUserResponse } from './mappers'
import { hashPassword, processRequest } from '../di'
import { validateCreateUserRequestModel } from './validators'
import { sendResponseModel } from '../express-tools'
import { getUsers, saveUser, getUser } from './storage'

const usersRouter = express.Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const offset: number = parseInt(req.query.offset as string, 10)
        const limit: number = parseInt(req.query.limit as string, 10)
        const response = await getAll(offset, limit, getUsers, mapUserToGetUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = parseInt(req.params.id as string, 10)
        const response = await get(id, getUser, mapUserToGetUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.post('/', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const map = mapCreateUserRequestToUser(hashPassword)
        const response = await create(req.body, validateCreateUserRequestModel, map, saveUser, mapUserToCreateUserResponse)
        sendResponseModel(response, res)
    })
})

export { usersRouter }