import express, { Request, Response } from 'express'
import { create, getAll } from './services'
import { mapCreateUserRequestToUser, mapUserToCreateUserResponse, mapUserToGetUserResponse } from './mappers'
import { hashPassword } from '../di'
import { validateCreateUserRequestModel } from './validators'
import { sendResponseModel } from '../express-models'
import { getUsers, saveUser } from './storage'

const usersRouter = express.Router()

const processRequest = async (res: Response, processor: () => Promise<void>) => {
    try {
        await processor()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

usersRouter.get('/', async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page: number = parseInt(req.query.page as string, 10)
        const response = await getAll(page, getUsers, mapUserToGetUserResponse)
        res.status(200).send(response)
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