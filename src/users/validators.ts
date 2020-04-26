import { CreateUserRequestModel, ICreateUserRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

export const validateCreateUserRequestModel = async (model: ICreateUserRequestModel): Promise<ValidationError[]> => {
    return await validate(new CreateUserRequestModel(model))
}