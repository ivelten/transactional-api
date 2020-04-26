import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'
import { getConnection } from 'typeorm'
import { User } from '../entity/user'

export function IsUserNameAlreadyInUse(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} contains an user name that is already been used by another user`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isUserNameAlreadyInUse',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (await getConnection().getRepository(User).findOne({ userName: value })) return false
                    return true
                }
            }
        })
    }
}

export function IsUserEmailAlreadyInUse(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions)
            validationOptions = { message: `${propertyName} contains an e-mail that is already been used by another user` }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isUserEmailAlreadyInUse',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (await getConnection().getRepository(User).findOne({ email: value }))
                        return false
                    return true
                }
            }
        })
    }
}