import { IsString, Length, IsEmail } from 'class-validator'
import { IsUserNameAlreadyInUse, IsUserEmailAlreadyInUse } from './validation'

interface ICreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
}

class CreateUserRequestModel implements ICreateUserRequestModel {
    constructor(model: ICreateUserRequestModel) {
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.userName = model.userName
        this.email = model.email
        this.password = model.password
    }

    @IsString()
    @Length(1, 50)
    firstName: string

    @IsString()
    @Length(0, 50)
    lastName: string

    @IsString()
    @Length(1, 100)
    @IsUserNameAlreadyInUse()
    userName: string

    @IsEmail()
    @IsUserEmailAlreadyInUse()
    email: string

    @IsString()
    password: string
}

interface ICreateUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
}

interface IGetUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
}

export { ICreateUserRequestModel, CreateUserRequestModel, ICreateUserResponseModel, IGetUserResponseModel }