import { ICreateUserResponseModel, IGetUserResponseModel, ICreateUserRequestModel } from './models'
import { User } from '../entity/user'
import { ResponseModel, makeResponseModel } from '../models'
import { ValidationError } from 'class-validator'

export const create = async (
    request: ICreateUserRequestModel,
    validateRequest: (request: ICreateUserRequestModel) => Promise<ValidationError[]>,
    mapRequestToUser: (request: ICreateUserRequestModel) => Promise<User>,
    saveUser: (user: User) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<ICreateUserResponseModel>): Promise<ResponseModel<ICreateUserResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            let user = await mapRequestToUser(request)
            user = await saveUser(user)
            return await mapUserToResponse(user)
    })
}

export const getAll = async (
    offset: number,
    limit: number,
    getUsers: (offset: number, limit: number) => Promise<User[]>,
    mapUserToResponse: (user: User) => Promise<IGetUserResponseModel>): Promise<IGetUserResponseModel[]> => {
        const users = await getUsers(offset, limit)
        const response = users.map(async (user) => await mapUserToResponse(user))
        return Promise.all(response)
}

export const get = async (
    id: number,
    getUser: (id: number) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<IGetUserResponseModel>): Promise<IGetUserResponseModel> => {
        const user = await getUser(id)
        return await mapUserToResponse(user)
}