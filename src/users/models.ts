import { IsString, Length, IsEmail, IsNotEmpty, MaxLength } from 'class-validator'
import { IsUserNameAlreadyInUse, IsUserEmailAlreadyInUse } from './validation'

export interface ICreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
}

export class CreateUserRequestModel implements ICreateUserRequestModel {
    constructor(model: ICreateUserRequestModel) {
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.userName = model.userName
        this.email = model.email
        this.password = model.password
    }

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    firstName: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    lastName: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsUserNameAlreadyInUse()
    userName: string

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    @IsUserEmailAlreadyInUse()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export interface ICreateUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
}

export interface IGetUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
}