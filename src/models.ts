import { ValidationError } from 'class-validator'

interface IBadRequestResponseModel {
    validationErrors: ValidationError[]
}

type ResponseModel<T> = T | IBadRequestResponseModel

const isBadRequest = <T>(response: ResponseModel<T>): boolean => {
    return 'validationErrors' in response
}

const makeResponseModel = <T>(validationErrors: ValidationError[], responseFactory: () => T) => {
    if (validationErrors.length > 0)
        return { validationErrors: validationErrors }
    return responseFactory()
}

export { IBadRequestResponseModel, ResponseModel, isBadRequest, makeResponseModel }