import { IsString, Length, IsEmail, IsNotEmpty, MaxLength, IsNumber, Min, Max, IsOptional } from 'class-validator'
import { IsUserNameAlreadyInUse, IsUserEmailAlreadyInUse } from './validation'

export interface ICreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    baseTax: number
    password: string
}

export class CreateUserRequestModel implements ICreateUserRequestModel {
    constructor(model: ICreateUserRequestModel) {
        if (model) {
            this.firstName = model.firstName
            this.lastName = model.lastName
            this.userName = model.userName
            this.email = model.email
            this.baseTax = model.baseTax
            this.password = model.password
        }
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
    @IsUserEmailAlreadyInUse()
    email: string

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0)
    @Max(100)
    baseTax: number

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