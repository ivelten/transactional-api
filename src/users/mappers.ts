import { CreateUserRequestModel, ICreateUserResponseModel, IGetUserResponseModel } from './models'
import { User } from '../entity/user'
import { mapper } from '../di'

export const mapCreateUserRequestToUser = 
    (hashPassword: (password: string) => Promise<string>) =>
        mapper(async (request: CreateUserRequestModel): Promise<User> => {
            const user = new User()
            user.firstName = request.firstName
            user.lastName = request.lastName
            user.email = request.email
            user.passwordHash = await hashPassword(request.password)
            user.userName = request.userName
            return user
})

export const mapUserToCreateUserResponse = 
    mapper(async (user: User): Promise<ICreateUserResponseModel> => {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName
        }
})

export const mapUserToGetUserResponse = 
    mapper(async (user: User): Promise<IGetUserResponseModel> => {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName
        }
})