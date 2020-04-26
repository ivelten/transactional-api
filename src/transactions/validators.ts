import { IAuthorizeTransactionRequestModel, AuthorizeTransactionRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

export const validateAuthorizeTransactionRequestModel = async (model: IAuthorizeTransactionRequestModel): Promise<ValidationError[]> => {
    return await validate(new AuthorizeTransactionRequestModel(model))
}