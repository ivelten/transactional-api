import { CreateUserRequestModel, ICreateUserRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

const validateCreateUserRequestModel = async (model: ICreateUserRequestModel): Promise<ValidationError[]> => {
    return await validate(new CreateUserRequestModel(model))
}

export { validateCreateUserRequestModel }