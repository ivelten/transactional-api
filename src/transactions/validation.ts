import { ValidationOptions, registerDecorator, ValidationArguments, isCreditCard } from 'class-validator'
import { getConnection } from 'typeorm'
import { CreditCard } from '../entity/credit-card'
import { User } from '../entity/user'

export function IsCreditCardUsable(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} contains a credit card that is not usable (invalid credit card number, insufficient balance or credit card is not active)`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isCreditCardUsable',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (!isCreditCard(value.creditCardNumber)) return false
                    const creditCard = await getConnection().getRepository(CreditCard).findOne({ number: value.creditCardNumber })
                    if (!creditCard) return false
                    if (!creditCard.active) return false
                    if (creditCard.balance < value.value) return false
                    return true
                }
            }
        })
    }
}

export function IsUserRegistered(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} contains an non-existend user ID`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isUserRegistered',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    const user = await getConnection().getRepository(User).findOne(value)
                    if (!user) return false
                    return true
                }
            }
        })
    }
}