import { ICreateUserResponseModel, IGetUserResponseModel, ICreateUserRequestModel } from './models'
import { User } from '../entity/user'
import { ResponseModel, makeResponseModel } from '../models'
import { ValidationError } from 'class-validator'

const create = async (
    request: ICreateUserRequestModel,
    validateRequest: (request: ICreateUserRequestModel) => Promise<ValidationError[]>,
    mapRequestToUser: (request: ICreateUserRequestModel) => Promise<User>,
    saveUser: (user: User) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<ICreateUserResponseModel>): Promise<ResponseModel<ICreateUserResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            var user = await mapRequestToUser(request)
            user = await saveUser(user)
            return await mapUserToResponse(user)
        })
}

const getAll = async (
    page: number,
    getUsers: (page: number) => Promise<User[]>,
    mapUserToResponse: (user: User) => Promise<IGetUserResponseModel>): Promise<IGetUserResponseModel[]> => {
        const users = await getUsers(page)
        const response = users.map(async (user) => await mapUserToResponse(user))
        return Promise.all(response)
}

export { create, getAll }